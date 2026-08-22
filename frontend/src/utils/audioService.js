// Tactile Audio Service for Veloop Fintech Spin Wheel
// Production-hardened Web Audio API architecture featuring centralized master GainNode,
// active node tracking/cleanup, overlap prevention, instant silencing, and subtle fintech gain staging.

class TactileAudioService {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    const storedMute = typeof window !== 'undefined' ? localStorage.getItem('veloop_audio_muted') : null;
    this.isMuted = storedMute === 'true';
    this.listeners = new Set();
    this.activeNodes = new Set();
    this.activeTimeouts = new Set();
    this.lastTickTime = 0;
  }

  // Lazily create and reuse single AudioContext + Master GainNode
  async ensureAudioContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch {
        // Autoplay policy safety
      }
    }
    return this.ctx;
  }

  // Instant mute/unmute control with localStorage persistence and active sound silencing
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('veloop_audio_muted', this.isMuted.toString());
    }
    this.updateMasterVolume();
    this.notifyListeners();
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = Boolean(muted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('veloop_audio_muted', this.isMuted.toString());
    }
    this.updateMasterVolume();
    this.notifyListeners();
  }

  getMuted() {
    return this.isMuted;
  }

  updateMasterVolume() {
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      // Fast 5ms linear ramp to prevent clicking artifacts on instant mute
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 1, now + 0.005);
    }
    if (this.isMuted) {
      this.stopAll();
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(fn => fn(this.isMuted));
  }

  // Registers active oscillator nodes for lifecycle management and instant cleanup
  registerNode(osc) {
    this.activeNodes.add(osc);
    osc.onended = () => {
      try {
        osc.disconnect();
      } catch {}
      this.activeNodes.delete(osc);
    };
  }

  // Registers scheduled setTimeout handles for clean cancellation
  registerTimeout(fn, delayMs) {
    const id = setTimeout(() => {
      this.activeTimeouts.delete(id);
      fn();
    }, delayMs);
    this.activeTimeouts.add(id);
    return id;
  }

  // Immediately stops and cleans up all currently playing and scheduled audio nodes
  stopAll() {
    this.activeTimeouts.forEach(id => clearTimeout(id));
    this.activeTimeouts.clear();

    this.activeNodes.forEach(node => {
      try {
        node.stop();
        node.disconnect();
      } catch {
        // Node may have already ended
      }
    });
    this.activeNodes.clear();
  }

  cleanup() {
    this.stopAll();
    this.listeners.clear();
  }

  // Subtle, tactile mechanical pin click with high-frequency velocity limiter
  async playTactileTick(pitchMultiplier = 1.0) {
    if (this.isMuted) return;

    // Prevent excessive overlapping ticks (minimum 12ms throttle)
    const nowMs = performance.now();
    if (nowMs - this.lastTickTime < 12) return;
    this.lastTickTime = nowMs;

    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      const duration = 0.028;

      // 1. Primary transient click (subtle fintech level)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + duration);

      gain.gain.setValueAtTime(0.40, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      this.registerNode(osc);
      osc.start(now);
      osc.stop(now + duration);

      // 2. High metallic snap layer
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();

      snapOsc.type = 'sine';
      snapOsc.frequency.setValueAtTime(2100 * pitchMultiplier, now);
      snapOsc.frequency.exponentialRampToValueAtTime(420, now + 0.014);

      snapGain.gain.setValueAtTime(0.25, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.014);

      snapOsc.connect(snapGain);
      snapGain.connect(this.masterGain);

      this.registerNode(snapOsc);
      snapOsc.start(now);
      snapOsc.stop(now + 0.016);
    } catch {
      // Graceful fallback
    }
  }

  // Futuristic, smooth 3D metallic whirring sweep synchronized with 5 3D revolutions
  async playIntro3DWhir() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      // Handle browser autoplay policy (suspended state before user gesture)
      if (ctx.state === 'suspended') {
        const resumeAndPlay = async () => {
          try {
            await ctx.resume();
            this.playIntro3DWhir();
          } catch {}
          window.removeEventListener('pointerdown', resumeAndPlay);
          window.removeEventListener('click', resumeAndPlay);
          window.removeEventListener('keydown', resumeAndPlay);
        };
        window.addEventListener('pointerdown', resumeAndPlay, { once: true });
        window.addEventListener('click', resumeAndPlay, { once: true });
        window.addEventListener('keydown', resumeAndPlay, { once: true });
        return;
      }

      const now = ctx.currentTime;
      const duration = 2.4;

      // 1. Primary 3D Whirring Background Glide (850Hz -> 160Hz)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + duration);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      this.registerNode(osc);
      osc.start(now);
      osc.stop(now + duration + 0.05);

      // 2. 5 Synchronized Metallic Clicks matching the 5 3D revolutions of the wheel
      const revolutionTimes = [0.05, 0.35, 0.80, 1.45, 2.15];
      const frequencies = [1800, 1500, 1200, 950, 600];

      revolutionTimes.forEach((timeOffset, idx) => {
        const clickTime = now + timeOffset;
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();

        clickOsc.type = 'triangle';
        clickOsc.frequency.setValueAtTime(frequencies[idx], clickTime);
        clickOsc.frequency.exponentialRampToValueAtTime(frequencies[idx] * 0.3, clickTime + 0.03);

        clickGain.gain.setValueAtTime(0.35 - idx * 0.03, clickTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, clickTime + 0.035);

        clickOsc.connect(clickGain);
        clickGain.connect(this.masterGain);

        this.registerNode(clickOsc);
        clickOsc.start(clickTime);
        clickOsc.stop(clickTime + 0.04);
      });

      // 3. Final mechanical lock-in click when 3D rotation settles
      this.registerTimeout(() => {
        this.playMechanicalStop();
      }, 2450);
    } catch {
      // Graceful fallback
    }
  }

  // Solid, damped mechanical stop when the wheel arrives at rest
  async playMechanicalStop() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      const duration = 0.055;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + duration);

      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      this.registerNode(osc);
      osc.start(now);
      osc.stop(now + duration + 0.005);
    } catch {
      // Graceful fallback
    }
  }

  // Restrained, elegant 3-note crystal confirmation chime on unlocking rewards
  async playRewardConfirmation() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      const frequencies = [880, 1108.73, 1318.51]; // A5, C#6, E6

      frequencies.forEach((freq, idx) => {
        const noteOffset = idx * 0.10;
        const noteTime = now + noteOffset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.28, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.7);

        osc.connect(gain);
        gain.connect(this.masterGain);

        this.registerNode(osc);
        osc.start(noteTime);
        osc.stop(noteTime + 0.72);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Gentle, sympathetic soft chord when landing on 'Lose' / No reward
  async playMissTone() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      const notes = [440, 392, 349.23]; // A4 -> G4 -> F4

      notes.forEach((freq, idx) => {
        const noteOffset = idx * 0.11;
        const noteTime = now + noteOffset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.20, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.38);

        osc.connect(gain);
        gain.connect(this.masterGain);

        this.registerNode(osc);
        osc.start(noteTime);
        osc.stop(noteTime + 0.40);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Soft double-thud when attempting to spin with 0 available spins
  async playEmptyTap() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      [0, 0.08].forEach(delay => {
        const tapTime = now + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, tapTime);
        osc.frequency.exponentialRampToValueAtTime(90, tapTime + 0.035);

        gain.gain.setValueAtTime(0.28, tapTime);
        gain.gain.exponentialRampToValueAtTime(0.001, tapTime + 0.04);

        osc.connect(gain);
        gain.connect(this.masterGain);

        this.registerNode(osc);
        osc.start(tapTime);
        osc.stop(tapTime + 0.045);
      });
    } catch {
      // Graceful fallback
    }
  }

  // Subtle micro-click for switching tabs
  async playTabSwitch() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1300, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.022);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

      osc.connect(gain);
      gain.connect(this.masterGain);

      this.registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Graceful fallback
    }
  }

  // Crisp micro-tap on button & claim interactions
  async playInteractionTap() {
    if (this.isMuted) return;
    try {
      const ctx = await this.ensureAudioContext();
      if (!ctx || !this.masterGain) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(380, now + 0.035);

      gain.gain.setValueAtTime(0.30, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      this.registerNode(osc);
      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Graceful fallback
    }
  }
}

export const soundFX = new TactileAudioService();
