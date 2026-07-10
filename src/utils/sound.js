// Simplified Web Audio API synthesizer with boosted volume and clean code logic
let isMuted = localStorage.getItem('tv_sound_muted') === 'true';
let sharedCtx = null;

export const isSoundMuted = () => isMuted;

export const setSoundMuted = (muted) => {
  isMuted = muted;
  localStorage.setItem('tv_sound_muted', String(muted));
};

const getAudioContext = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    
    if (!sharedCtx) {
      sharedCtx = new AudioContextClass();
    }
    
    // Automatically resume context if it is suspended by browser autoplay policies
    if (sharedCtx && sharedCtx.state === 'suspended') {
      sharedCtx.resume().catch(() => {});
    }
    return sharedCtx;
  } catch (e) {
    return null;
  }
};

export const playTactileSound = (type = 'click') => {
  console.log(`🔊 [playTactileSound] Called with type: "${type}". Global isMuted:`, isMuted);
  if (isMuted) {
    console.log("🔊 [playTactileSound] Sound is globally muted. Exiting.");
    return;
  }
  
  const ctx = getAudioContext();
  if (!ctx) {
    console.warn("🔊 [playTactileSound] Failed to initialize AudioContext.");
    return;
  }
  
  console.log(`🔊 [playTactileSound] AudioContext state: "${ctx.state}", currentTime: ${ctx.currentTime.toFixed(3)}`);

  try {
    if (type === 'tick') {
      // High, crisp tick for minor navigation links and hovers
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      gain.gain.setValueAtTime(0.5, ctx.currentTime); // Louder peak
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.06); // Linear decay is louder than exponential
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'clack') {
      // Hollow, woody snap sound for selectors and close buttons
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      gain.gain.setValueAtTime(0.8, ctx.currentTime); // High volume clack
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else {
      // Solid mechanical click for primary buttons and form submits
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      gain.gain.setValueAtTime(1.0, ctx.currentTime); // Max volume click
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    console.error("🔊 [playTactileSound] Error inside synthesizer:", e);
  }
};
