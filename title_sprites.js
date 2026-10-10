'use strict';
/* タイトル画面の背景ドット絵 (低解像度キャンバスを手続き生成し、拡大表示する) */
function makeTitleBackground() {
  const W = 160, H = 90, c = document.createElement('canvas');
  c.width = W; c.height = H;
  const g = c.getContext('2d');
  let seed = 12345;
  const r = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
  const px = (x, y, col) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), 1, 1); };
  // 水の深さグラデーション (段階的なバンド)
  const bands = ['#0a3a52', '#082f45', '#06263a', '#051d2e', '#041524', '#030e1a'];
  bands.forEach((col, i) => { g.fillStyle = col; g.fillRect(0, Math.floor(i * H / bands.length), W, Math.ceil(H / bands.length)); });
  // 光の筋
  for (let i = 0; i < 6; i++) {
    const x0 = 10 + i * 28 + r() * 8;
    for (let y = 0; y < 60; y++) {
      const x = x0 + y * 0.35;
      for (let w = 0; w < 3 - Math.floor(y / 25); w++) if (((x + w + y) | 0) % 2 === 0) px(x + w, y, 'rgba(120,220,255,0.10)');
    }
  }
  // 底の汚泥の丘
  for (let x = 0; x < W; x++) {
    const h = 8 + Math.sin(x * 0.07) * 3 + Math.sin(x * 0.19) * 2;
    for (let y = H - Math.round(h); y < H; y++) px(x, y, y === H - Math.round(h) ? '#6b5a3a' : (r() < 0.12 ? '#3f3322' : '#2f261a'));
  }
  // 微生物 (ツリガネムシ風・ミドリムシ風・アメーバ風)
  const bell = (x, y, s, body) => {
    for (let dy = -s; dy <= 0; dy++) for (let dx = -s; dx <= s; dx++) if (dx * dx + dy * dy * 1.2 <= s * s) px(x + dx, y + dy, body);
    for (let dx = -s; dx <= s; dx += 2) px(x + dx, y - s, '#ffffff');
    for (let dy = 1; dy < 14; dy++) px(x + Math.round(Math.sin(dy * 0.8) * 1.2), y + dy, '#8fd6ee');
  };
  bell(30, 66, 6, '#bfe9ff'); bell(122, 70, 8, '#a8dcf2'); bell(78, 72, 4, '#d4f1ff');
  const euglena = (x, y, col) => {
    for (let i = 0; i < 9; i++) px(x + i, y + Math.round(Math.sin(i * 0.7)), col);
    for (let i = 0; i < 9; i++) px(x + i, y + 1 + Math.round(Math.sin(i * 0.7)), col);
    px(x + 9, y - 1, '#ff6b6b'); px(x - 2, y - 2 + 0, '#9dffb0'); px(x - 3, y - 3, '#9dffb0');
  };
  euglena(52, 40, '#6dff8a'); euglena(104, 28, '#5de07a'); euglena(14, 24, '#6dff8a');
  const ameba = (x, y, col) => {
    for (let dy = -4; dy <= 4; dy++) for (let dx = -6; dx <= 6; dx++) if (dx * dx / 36 + dy * dy / 16 <= 1 + Math.sin(Math.atan2(dy, dx) * 4) * 0.2) px(x + dx, y + dy, col);
    px(x - 1, y - 1, '#ffffff'); px(x + 2, y, '#554477');
  };
  ameba(135, 44, '#d9a3ff'); ameba(24, 48, '#ffd27a');
  // 気泡
  for (let i = 0; i < 40; i++) {
    const x = r() * W, y = r() * 70, s = r() < 0.2 ? 2 : 1;
    px(x, y, '#9fe7ff'); if (s === 2) { px(x + 1, y, '#5fb7d7'); px(x, y + 1, '#5fb7d7'); px(x - 1, y, '#5fb7d7'); px(x, y - 1, '#5fb7d7'); }
  }
  // 浮遊するゴミ粒
  for (let i = 0; i < 60; i++) px(r() * W, r() * H, r() < 0.5 ? '#1d6a8f' : '#2b8fb3');
  return c;
}
