from rembg import remove
from PIL import Image
import sys

def remove_background(input_path, output_path):
    input_img = Image.open(input_path)
    # the rembg model automatically cuts out the subject beautifully!
    output_img = remove(input_img)
    output_img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    remove_background(sys.argv[1], sys.argv[2])
