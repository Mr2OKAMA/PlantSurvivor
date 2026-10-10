// ドット絵スプライト（16x16）。'.'は透明。パレット文字は各キャラの「パレット」で色に対応。
const PIXEL_SPRITES = {
  // ツリガネムシ：釣鐘型の体と、縮む柄
  tsurigane: {
    パレット: { o: '#2b5d7a', b: '#bfe9ff', l: '#ffffff', d: '#8cc7e6', e: '#103040', c: '#e8f8ff', s: '#6fa8c4' },
    絵: [
      '................',
      '.....oooooo.....',
      '...ooblllbboo...',
      '..obbbbbbbbbdo..',
      '.obbbbbbbbbbbdo.',
      '.obbebbbbbebbdo.',
      '.obbbbbbbbbbddo.',
      '..oobbbbbbddoo..',
      '.cooooooooooooc.',
      '.c.c.cccccc.c.c.',
      '......osso......',
      '.......os.......',
      '......os........',
      '.......os.......',
      '......os........',
      '.....oss........',
    ],
  },
  // アスピディスカ：平たい楕円の体と、足のような繊毛
  aspidisca: {
    パレット: { o: '#8a5a1a', y: '#ffd27a', l: '#fff2c4', d: '#e0a548', e: '#3a2208', c: '#c98a2e' },
    絵: [
      '................',
      '................',
      '....oooooooo....',
      '..ooyyllyyyyoo..',
      '.oyyyllyyyyyyyo.',
      'oyyyyyyyyyyeyyyo',
      'oyyyyyyyyyyyyyyo',
      'oyddyyyyyyyyyddo',
      '.oddyyyyyyyyddo.',
      '..ooddddddddoo..',
      '....oooooooo....',
      '..c.c.c.c.c.c.c.',
      '.c.c.c.c.c.c.c..',
      '................',
      '................',
      '................',
    ],
  },
  // アルセラ：茶色いドーム状の殻と、そこから出る仮足
  arcella: {
    パレット: { o: '#5a3a14', s: '#d9a066', l: '#f6d8a8', d: '#a8723a', p: '#f0e4c8', e: '#2a1a08', q: '#cdbf9c' },
    絵: [
      '................',
      '................',
      '.....oooooo.....',
      '...ooslllssoo...',
      '..osslssssssso..',
      '.osslsssssssddo.',
      '.ossssssssssddo.',
      'ossssssssssssddo',
      'osdsdsdsdsdsdsdo',
      'oooooooooooooooo',
      '.oppeppppeppppo.',
      '..oqppppppppqo..',
      '...qp.qppq.pq...',
      '..qp...qq...pq..',
      '.qp..........pq.',
      '................',
    ],
  },
  // クマムシ：ずんぐりした体節と8本の短い脚
  kumamushi: {
    パレット: { o: '#4a3a7a', b: '#b8a7e8', l: '#e6defa', d: '#8f7cc8', e: '#1a1030', n: '#9a88d6' },
    絵: [
      '................',
      '................',
      '................',
      '....oooooooo....',
      '..ooblllbbbboo..',
      '.obbbbbbbbbbbbo.',
      'oeebbnbbnbbnbbbo',
      'oeebbnbbnbbnbbbo',
      'obbbbnbbnbbnbbdo',
      '.obbbnbbnbbnbddo',
      '..oodddddddddoo.',
      '..odo.odo.odo.do',
      '..ooo.ooo.ooo.oo',
      '................',
      '................',
      '................',
    ],
  },
  // ミドリムシ：緑の紡錘形、赤い眼点、長い鞭毛
  midorimushi: {
    パレット: { o: '#1f6a35', g: '#6dff8a', l: '#d8ffe2', d: '#3fc460', r: '#ff4d4d', f: '#c8ffd4' },
    絵: [
      '.............f..',
      '............f...',
      '...........f....',
      '..........f.....',
      '.....oooooo.....',
      '...ooglllggoo...',
      '..oggglgggggdo..',
      '.oggrrggggggddo.',
      '.ogrrgggggggddo.',
      '.oggggggggggddo.',
      '..ogggggggdddo..',
      '...oodddddddoo..',
      '.....oooooo.....',
      '................',
      '................',
      '................',
    ],
  },
  // ロタリア：ピンクの体と頭部の繊毛の輪（輪虫）
  rotaria: {
    パレット: { o: '#8a2a58', p: '#ff9ec4', l: '#ffe3ef', d: '#d9628f', e: '#2a0f1c', c: '#ffc2dc' },
    絵: [
      '................',
      '...c.c.cc.c.c...',
      '..cc.cccccc.cc..',
      '...cooooooooc...',
      '....oplllppo....',
      '....opepepdo....',
      '....oppppddo....',
      '.....oppddo.....',
      '.....oppddo.....',
      '.....oppddo.....',
      '.....opdddo.....',
      '......oppo......',
      '......oddo......',
      '.....oddddo.....',
      '.....oo..oo.....',
      '................',
    ],
  },
  // ユープロテス：楕円の殻と棘状の繊毛
  euprotes: {
    パレット: { o: '#7a2a1a', r: '#ff7a5c', l: '#ffd0c4', d: '#c24a30', e: '#2a0c06', s: '#ffb08a' },
    絵: [
      '................',
      '................',
      '....oooooooo....',
      '..ooorlllrrrooo.',
      '.orrrrrrrrrrrrdo',
      '.orerrrrrrrrrrdo',
      '.orrrrrrrrrrrddo',
      '.orrrrrrrrrdddo.',
      '..ooddddddddoo..',
      '...ooooooooo....',
      '..s.s.s.s.s.s...',
      '.s.s.s.s.s.s.s..',
      '................',
      '................',
      '................',
      '................',
    ],
  },
  // トコフィリア：丸い体と吸盤付き触手（捕食性の吸管虫）
  tokophilia: {
    パレット: { o: '#4a2a7a', v: '#c77dff', l: '#ecd4ff', d: '#9a52d9', e: '#1c0c30', t: '#e8b0ff' },
    絵: [
      '..t...t...t...t.',
      '..t...t...t...t.',
      '.tt..tt..tt..tt.',
      '..o.oooooooo.o..',
      '...ovvlllvvvo...',
      '..ovvvvvvvvvdo..',
      '..ovevvvvvevdo..',
      '..ovvvvvvvvddo..',
      '...ovvvvvdddo...',
      '....oodddddoo...',
      '......oooo......',
      '.......vd.......',
      '.......vd.......',
      '.......vd.......',
      '......ovdo......',
      '.....oooooo.....',
    ],
  },
};

// スプライトをCanvasに描画して返す（scale: 拡大率）
function makeSpriteCanvas(id, scale = 1) {
  const s = PIXEL_SPRITES[id], rows = s.絵;
  const cv = document.createElement('canvas');
  cv.width = 16 * scale; cv.height = rows.length * scale;
  const ctx = cv.getContext('2d');
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const col = s.パレット[row[x]];
      if (!col) continue;
      ctx.fillStyle = col;
      ctx.fillRect(x * scale, y * scale, scale, scale);
    }
  });
  return cv;
}
