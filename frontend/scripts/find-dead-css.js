import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import * as babelParser from '@babel/parser';
import _traverse from '@babel/traverse';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const traverse = _traverse.default || _traverse;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');

async function main() {
  console.log(chalk.blue('Starting Dead CSS Detector...'));

  const cssFiles = globSync('**/*.css', { cwd: SRC_DIR, absolute: true });
  const jsxFiles = globSync('**/*.{jsx,tsx}', { cwd: SRC_DIR, absolute: true });

  // { filePath: { type: 'module' | 'global', selectors: Map<selector, line> } }
  const cssRegistry = new Map();

  console.log(`Found ${cssFiles.length} CSS files and ${jsxFiles.length} JSX/TSX files.`);

  const normalizePath = (p) => path.resolve(p).toLowerCase().replace(/\\/g, '/');

  // 1. Parse CSS
  for (const rawFile of cssFiles) {
    const file = normalizePath(rawFile);
    const isModule = file.endsWith('.module.css');
    const content = fs.readFileSync(rawFile, 'utf-8');
    const root = postcss.parse(content, { from: rawFile });
    const selectors = new Map();

    root.walkRules((rule) => {
      // Ignore keyframes
      if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name.includes('keyframes')) return;
      
      const line = rule.source.start.line;
      selectorParser((selectorsAst) => {
        selectorsAst.walkClasses((node) => {
          if (!selectors.has(node.value)) {
            selectors.set(node.value, line);
          }
        });
        selectorsAst.walkIds((node) => {
          if (!selectors.has(node.value)) {
            selectors.set(node.value, line);
          }
        });
      }).processSync(rule.selector);
    });

    cssRegistry.set(file, { type: isModule ? 'module' : 'global', selectors });
  }

  // Set of all globally used string classes
  const globallyUsedClasses = new Set();
  
  // { cssFilePath: { usedClasses: Set<string>, hasDynamicUsage: boolean } }
  const moduleUsages = new Map();

  // Initialize module usages
  for (const rawFile of cssFiles) {
      if (rawFile.endsWith('.module.css')) {
          moduleUsages.set(normalizePath(rawFile), { usedClasses: new Set(), hasDynamicUsage: false });
      }
  }

  // { filePath: { ast, cssImports: Map<string, string>, jsxImports: Map<string, string>, associatedCss: Set<string>, hasDynamic: boolean, usedClasses: Set<string> } }
  const jsxRegistry = new Map();

  // Phase 1: Parse JSX and resolve imports
  for (const rawFile of jsxFiles) {
    const file = normalizePath(rawFile);
    const content = fs.readFileSync(rawFile, 'utf-8');
    let ast;
    try {
      ast = babelParser.parse(content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript'],
      });
    } catch (e) {
      console.warn(chalk.yellow(`Could not parse ${file}: ${e.message}`));
      continue;
    }

    const cssImports = new Map();
    const jsxImports = new Map();

    const resolveJsxImport = (dir, source) => {
      const base = path.resolve(dir, source);
      const exts = ['.jsx', '.tsx', '.js', '/index.jsx', '/index.tsx', '/index.js'];
      
      // If it already has an extension
      if (fs.existsSync(base) && fs.statSync(base).isFile()) {
          return normalizePath(base);
      }
      
      for (const ext of exts) {
        const full = base + ext;
        if (fs.existsSync(full) && fs.statSync(full).isFile()) {
          return normalizePath(full);
        }
      }
      return null;
    };

    traverse(ast, {
      ImportDeclaration(pathNode) {
        const source = pathNode.node.source.value;
        if (source.endsWith('.module.css')) {
          const absolutePath = normalizePath(path.resolve(path.dirname(file), source));
          pathNode.node.specifiers.forEach(spec => {
            if (spec.type === 'ImportDefaultSpecifier') {
              cssImports.set(spec.local.name, absolutePath);
            }
          });
        } else if (source.startsWith('.')) {
          // Might be a component import
          const compPath = resolveJsxImport(path.dirname(file), source);
          if (compPath) {
            pathNode.node.specifiers.forEach(spec => {
              if (spec.type === 'ImportDefaultSpecifier' || spec.type === 'ImportSpecifier') {
                jsxImports.set(spec.local.name, compPath);
              }
            });
          }
        }
      }
    });

    jsxRegistry.set(file, {
      ast,
      cssImports,
      jsxImports,
      associatedCss: new Set(cssImports.values()), // Initially just what it imports directly
      hasDynamic: false,
      usedClasses: new Set()
    });
  }

  // Phase 2: Find cross-component CSS module passing
  let cssPropagated = true;
  while(cssPropagated) {
      cssPropagated = false;
      for (const [file, data] of jsxRegistry.entries()) {
        traverse(data.ast, {
          JSXOpeningElement(pathNode) {
            if (pathNode.node.name.type === 'JSXIdentifier') {
              const compName = pathNode.node.name.name;
              if (data.jsxImports.has(compName)) {
                const targetPath = data.jsxImports.get(compName);
                // Check attributes for passing imported CSS modules
                pathNode.node.attributes.forEach(attr => {
                  if (attr.type === 'JSXAttribute' && attr.value && attr.value.type === 'JSXExpressionContainer') {
                    const expr = attr.value.expression;
                    if (expr.type === 'Identifier' && data.cssImports.has(expr.name)) {
                      // This component receives this CSS module!
                      const targetData = jsxRegistry.get(targetPath);
                      if (targetData) {
                        const targetCss = data.cssImports.get(expr.name);
                        if (!targetData.associatedCss.has(targetCss)) {
                            targetData.associatedCss.add(targetCss);
                            // We need to also let this target component know it's a valid css module import name
                            targetData.cssImports.set(attr.name.name, targetCss);
                            cssPropagated = true;
                        }
                      }
                    }
                  }
                });
              }
            }
          }
        });
      }
  }

  // Phase 3: Extract usages globally within each file
  for (const [file, data] of jsxRegistry.entries()) {
    traverse(data.ast, {
      ImportDeclaration(pathNode) {
        const source = pathNode.node.source.value;
        if (source.endsWith('.module.css')) {
          pathNode.node.specifiers.forEach(spec => {
             if (spec.type === 'ImportSpecifier') {
                // Destructured import
                data.usedClasses.add(spec.imported.name || spec.imported.value);
             }
          });
        }
      },
      JSXAttribute(pathNode) {
        const name = pathNode.node.name.name;
        if (name === 'className' || name === 'id') {
          // If it's a string, it's global
          const value = pathNode.node.value;
          if (value?.type === 'StringLiteral') {
            const classes = value.value.split(/\s+/).filter(Boolean);
            classes.forEach(c => globallyUsedClasses.add(c));
          }
          // We also traverse inside the attribute value to find nested string literals (e.g. in templates)
          pathNode.traverse({
             StringLiteral(innerPath) {
               const classes = innerPath.node.value.split(/\s+/).filter(Boolean);
               classes.forEach(c => {
                 globallyUsedClasses.add(c);
                 data.usedClasses.add(c);
               });
             },
             TemplateElement(innerPath) {
               const classes = innerPath.node.value.raw.split(/\s+/).filter(Boolean);
               classes.forEach(c => {
                 globallyUsedClasses.add(c);
                 data.usedClasses.add(c);
               });
             }
          });
        }
      },
      ObjectProperty(pathNode) {
        // e.g. const { heroCard, heroText } = styles;
        if (pathNode.node.value && pathNode.node.value.type === 'Identifier') {
           // We're just going to broadly record any destructured property name in case it's a class
           if (pathNode.node.key.type === 'Identifier') {
               data.usedClasses.add(pathNode.node.key.name);
           }
        }
      },
      VariableDeclarator(pathNode) {
         if (pathNode.node.id.type === 'ObjectPattern') {
            pathNode.node.id.properties.forEach(prop => {
                if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
                    data.usedClasses.add(prop.key.name);
                }
            });
         }
      },
      MemberExpression(pathNode) {
        // Collect ALL property accesses to be extremely safe
        if (!pathNode.node.computed && pathNode.node.property.type === 'Identifier') {
          data.usedClasses.add(pathNode.node.property.name);
        } else if (pathNode.node.computed && pathNode.node.property.type === 'StringLiteral') {
          data.usedClasses.add(pathNode.node.property.value);
        } else if (pathNode.node.computed && pathNode.node.property.type !== 'StringLiteral') {
          // Dynamic computed property!
          if (pathNode.node.object.type === 'Identifier') {
             const objName = pathNode.node.object.name;
             // If the object name looks like styles, classes, or matches an imported css module
             if (/^(styles|classes|css|theme)$/i.test(objName) || data.cssImports.has(objName)) {
                data.hasDynamic = true;
             }
          } else {
             // To be absolutely safe, if there's any dynamic MemberExpression on anything complex, assume it might be styles
             data.hasDynamic = true; 
          }
        }
      }
    });
    
    // Phase 4: Register usages into moduleUsages
    for (const cssFile of data.associatedCss) {
      if (!moduleUsages.has(cssFile)) {
         moduleUsages.set(cssFile, { usedClasses: new Set(), hasDynamicUsage: false });
      }
      const usage = moduleUsages.get(cssFile);
      if (data.hasDynamic) usage.hasDynamicUsage = true;
      data.usedClasses.forEach(c => usage.usedClasses.add(c));
    }
  }

  // 3. Report
  let highConfidenceCount = 0;
  let lowConfidenceCount = 0;
  
  console.log(chalk.cyan('\n--- Dead CSS Report ---\n'));

  for (const [cssFile, { type, selectors }] of cssRegistry.entries()) {
    const relativePath = path.relative(ROOT_DIR, cssFile);
    let unused = [];

    if (type === 'module') {
      const usage = moduleUsages.get(cssFile) || { usedClasses: new Set(), hasDynamicUsage: false };
      for (const [sel, line] of selectors.entries()) {
        if (!usage.usedClasses.has(sel)) {
          // If there is dynamic usage in the module, we can't be sure it's dead
          const confidence = usage.hasDynamicUsage ? 'Low' : 'High';
          unused.push({ selector: sel, line, confidence });
        }
      }
    } else {
      // Global
      for (const [sel, line] of selectors.entries()) {
        if (!globallyUsedClasses.has(sel)) {
          unused.push({ selector: sel, line, confidence: 'High' });
        }
      }
    }

    if (unused.length > 0) {
      console.log(chalk.yellow(`File: ${relativePath}`));
      unused.forEach(u => {
        if (u.confidence === 'High') {
            highConfidenceCount++;
        } else {
            lowConfidenceCount++;
        }
        let confColor = u.confidence === 'High' ? chalk.green(u.confidence) : chalk.red(u.confidence);
        console.log(`  Line ${u.line}: .${u.selector} [Confidence: ${confColor}]`);
      });
      console.log('');
    }
  }

  if (highConfidenceCount === 0 && lowConfidenceCount === 0) {
    console.log(chalk.green('No dead CSS found! Great job.'));
  } else {
    console.log(chalk.magenta(`Total potentially unused selectors: ${highConfidenceCount + lowConfidenceCount} (High: ${highConfidenceCount}, Low: ${lowConfidenceCount})`));
  }
}

main().catch(err => {
  console.error(chalk.red('Error:'), err);
  process.exit(1);
});
