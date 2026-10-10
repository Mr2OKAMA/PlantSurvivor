// WebAudio による簡易ゲーム音（外部ファイル不要）
const SFX = (() => {
  let ctx = null, master = null, bgmTimer = null, bgmKind = null, step = 0;
  const last = {};
  function init() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC(); master = ctx.createGain(); master.gain.value = 0.3; master.connect(ctx.destination);
  }
  function tone(freq, dur, type = 'square', vol = 0.3, delay = 0, slide = 0) {
    if (!ctx) return;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.02);
  }
  function play(name, minGap) {
    if (!ctx) return;
    const n = ctx.currentTime;
    if (minGap && last[name] && n - last[name] < minGap) return;
    last[name] = n;
    switch (name) {
      case 'tap': tone(660, 0.07, 'square', 0.15); break;
      case 'start': [392, 523, 659, 784].forEach((f, i) => tone(f, 0.18, 'square', 0.22, i * 0.09)); break;
      case 'xp': tone(900 + Math.random() * 200, 0.08, 'sine', 0.15, 0, 500); break;
      case 'kill': tone(300, 0.12, 'sawtooth', 0.15, 0, -200); break;
      case 'hurt': tone(160, 0.18, 'sawtooth', 0.3, 0, -90); break;
      case 'levelup': [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.15, 'triangle', 0.25, i * 0.07)); break;
      case 'boss': for (let i = 0; i < 4; i++) { tone(110, 0.25, 'sawtooth', 0.35, i * 0.3); tone(116, 0.25, 'square', 0.2, i * 0.3); } break;
      case 'bossKill': [392, 330, 262, 523, 659, 784].forEach((f, i) => tone(f, 0.2, 'square', 0.25, i * 0.1)); break;
      case 'win': [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, 0.22, 'triangle', 0.3, i * 0.12)); break;
      case 'lose': [330, 262, 196, 131].forEach((f, i) => tone(f, 0.3, 'triangle', 0.3, i * 0.2)); break;
    }
  }
  const SONGS = {
    menu: { tempo: 0.42, notes: [262, 330, 392, 330, 294, 349, 440, 349, 262, 330, 392, 523, 392, 330, 294, 0], type: 'sine', vol: 0.12 },
    run: { tempo: 0.2, notes: [147, 0, 147, 175, 0, 147, 196, 0, 131, 0, 131, 165, 0, 131, 175, 165], type: 'triangle', vol: 0.16 },
  };
  function bgm(kind) {
    if (kind === bgmKind) return;
    bgmKind = kind; clearInterval(bgmTimer); bgmTimer = null; step = 0;
    if (!kind || !SONGS[kind]) return;
    const s = SONGS[kind];
    bgmTimer = setInterval(() => {
      if (!ctx || ctx.state !== 'running') return;
      const f = s.notes[step++ % s.notes.length];
      if (f) tone(f, s.tempo * 0.9, s.type, s.vol);
    }, s.tempo * 1000);
  }
  return { init, play, bgm };
})();
['pointerdown', 'keydown'].forEach(ev => window.addEventListener(ev, () => SFX.init(), { passive: true }));
window.addEventListener('pointerdown', e => {
  if (e.target.closest && e.target.closest('button, .card')) SFX.play('tap');
}, true);
