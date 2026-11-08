// Web Audio API Synthesizer for React
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.musicTimeout = null;
    this.musicLoopId = 0;
    this.isMuted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.isPlayingMusic) {
      this.stopMusicBox();
    }
    return this.isMuted;
  }

  playPop(freq = 440) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playBoing() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(460, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  playMeow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.45);
  }

  playSparkle() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [659.25, 830.61, 987.77, 1318.51, 1661.22];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = now + idx * 0.06;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + 0.45);
    });
  }

  playCandleBlow() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(300, now + 0.3);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);

    setTimeout(() => {
      this.playSparkle();
    }, 200);
  }

  playMusicBoxNote(freq, time, duration = 0.8) {
    if (!this.ctx || this.isMuted) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    gainNode.gain.setValueAtTime(0.15, time);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  startMusicBox(onTick) {
    this.init();
    if (!this.ctx) return;
    this.isPlayingMusic = true;
    const currentLoop = ++this.musicLoopId;

    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0
    };

    const song = [
      [N.G4, 0.75], [N.G4, 0.25], [N.A4, 1.0], [N.G4, 1.0], [N.C5, 1.0], [N.B4, 2.0],
      [N.G4, 0.75], [N.G4, 0.25], [N.A4, 1.0], [N.G4, 1.0], [N.D5, 1.0], [N.C5, 2.0],
      [N.G4, 0.75], [N.G4, 0.25], [N.G5, 1.0], [N.E5, 1.0], [N.C5, 1.0], [N.B4, 1.0], [N.A4, 1.5],
      [N.F5, 0.75], [N.F5, 0.25], [N.E5, 1.0], [N.C5, 1.0], [N.D5, 1.0], [N.C5, 2.5],
      [N.E5, 1.0], [N.G5, 1.0], [N.A5, 1.0], [N.G5, 1.5],
      [N.E5, 0.8], [N.D5, 0.8], [N.C5, 2.0]
    ];

    const beatDuration = 0.52;

    const scheduleSequence = () => {
      if (!this.isPlayingMusic || currentLoop !== this.musicLoopId) return;

      let currentTime = this.ctx.currentTime + 0.05;

      song.forEach(([freq, beats], idx) => {
        const noteDuration = beats * beatDuration;
        this.playMusicBoxNote(freq, currentTime, noteDuration * 1.5);

        const delayMs = (currentTime - this.ctx.currentTime) * 1000;
        setTimeout(() => {
          if (this.isPlayingMusic && onTick) onTick(idx);
        }, Math.max(0, delayMs));

        currentTime += noteDuration;
      });

      const totalSongDuration = (currentTime - this.ctx.currentTime) * 1000;

      this.musicTimeout = setTimeout(() => {
        if (this.isPlayingMusic && currentLoop === this.musicLoopId) {
          scheduleSequence();
        }
      }, totalSongDuration + 1500);
    };

    scheduleSequence();
  }

  stopMusicBox() {
    this.isPlayingMusic = false;
    this.musicLoopId++;
    if (this.musicTimeout) {
      clearTimeout(this.musicTimeout);
      this.musicTimeout = null;
    }
  }

  toggleMusicBox(onTick) {
    if (this.isPlayingMusic) {
      this.stopMusicBox();
      return false;
    } else {
      this.startMusicBox(onTick);
      return true;
    }
  }
}

export const sound = new SoundEngine();
