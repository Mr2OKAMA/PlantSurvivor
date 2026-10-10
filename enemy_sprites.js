// 敵のドット絵スプライト（16x16）。'.'は透明。PIXEL_SPRITESに追加して makeSpriteCanvas で描画する。
const E_FACE = { e: '#ffffff', p: '#111111' };
Object.assign(PIXEL_SPRITES, {
  // BOD：茶色い有機物のかたまり
  bod: { パレット: { o: '#4a2c10', b: '#8b5a2b', l: '#b98450', d: '#6a4018', ...E_FACE }, 絵: [
    '................', '................', '.....oooo.......', '...ooblbboo.....', '..obbbbbbbbo.oo.',
    '.oblbbbbbbbboblo', '.obbbeebbeebbbo.', '.obbbpebbpebbbo.', '.obbbbbbbbbbddo.', '.oddbbbbbbbddo..',
    '..oddddbbdddoo..', '...ooodddddo....', '......oooo......', '................', '................', '................' ] },
  // SS：灰色の浮遊物質（角ばった粒）
  ss: { パレット: { o: '#4f4b3a', b: '#b9b39a', l: '#e0dac0', d: '#8a846c', ...E_FACE }, 絵: [
    '................', '................', '...o..oo....o...', '..obo.obbo.obo..', '.obbboobbboobbo.',
    '.obllbbbbbbbbdo.', '..obbeebbeebdo..', '..obbpebbpebdo..', '.obbbbbbbbbbddo.', '.obbbbbbbbbddo..',
    '..oddobbbbdoodo.', '...oo.oddddo.oo.', '.......oooo.....', '................', '................', '................' ] },
  // アンモニア：青い水滴状の分子
  ammonia: { パレット: { o: '#1f5f8a', b: '#7ad1ff', l: '#e4f6ff', d: '#4aa3d6', ...E_FACE }, 絵: [
    '................', '.......oo.......', '......obbo......', '.....oblbbo.....', '....obllbbbo....',
    '...obbbbbbbdo...', '..obbeebbeebdo..', '..obbpebbpebdo..', '..obbbbbbbbbdo..', '..obbbboobbbdo..',
    '..oddbbbbbddo...', '...oodddddddo...', '.....oooooo.....', '................', '................', '................' ] },
  // ノカルディア：枝分かれした糸状の菌
  nocardia: { パレット: { o: '#4a2e12', b: '#9b6b3a', l: '#c99a62', d: '#73491f', ...E_FACE }, 絵: [
    '................', '.o....o....o....', '.bo..ob...ob....', '..bo.bo..ob.....', '..obbbbbbbbo....',
    '.obbbbbbbbbbo...', '.obbeebbeebbbo..', '.obbpebbpebbbo..', '.obbbbbbbbbbdo..', '..oddbbbbbddo...',
    '...obdddddbo....', '..ob.odddo.bo...', '.ob...ooo...bo..', '.o............o.', '................', '................' ] },
  // バルキング糸状菌：もつれた黄色い糸
  bulking: { パレット: { o: '#7a6a20', b: '#d6c36b', l: '#f5eaa6', d: '#b09c40', ...E_FACE }, 絵: [
    '................', '..oo..oooo..oo..', '.obbo.obbbo.obbo', '.obbbooblbboobbo', '..obbbbbbbbbbo..',
    '.oooobeebeebooo.', 'obbbobpebpebobbo', 'oblbbbbbbbbbbbbo', '.obboddbbbddobo.', '..oobbooooobbo..',
    '.obbo.obbbo.obbo', '.obo..obbbo..obo', '..o....ooo....o.', '................', '................', '................' ] },
  // センチュウ：うねる細長いミミズ状
  nematode: { パレット: { o: '#7a5a3a', b: '#f1d0b0', l: '#fff0e0', d: '#d0a47c', ...E_FACE }, 絵: [
    '................', '................', '................', '..ooo...........', '.obbbo...oooo...',
    '.oepbo..obbbbo..', '.obbbbooblbbdo..', '..obbbbbbbbddo..', '...oodddddoddo..', '........oo.oddo.',
    '...........oddo.', '..........obddo.', '..........obbo..', '...........oo...', '................', '................' ] },
  // ダニ類：赤い丸い体と8本の脚
  mite: { パレット: { o: '#4a1410', b: '#c44d3a', l: '#f08a74', d: '#8f2e20', ...E_FACE }, 絵: [
    '................', '................', '.o............o.', '..o...oooo...o..', '...o.obllbo.o...',
    'o...obbbbbbo...o', '.ooobbeebeebooo.', '....obpebpebo...', 'o..obbbbbbbbbo.o', '.ooobbbddbbbooo.',
    '...oobddddboo...', '..o..oooooo..o..', '.o............o.', 'o..............o', '................', '................' ] },
  // スカム：浮いた汚泥の層、泡つき
  scum: { パレット: { o: '#3a2c18', b: '#6e5a3f', l: '#9a845f', d: '#4f3f2a', w: '#d8cfae', ...E_FACE }, 絵: [
    '................', '..w.....w.......', '.wow...wow..w...', '..o..oooooo.o...', '...ooblbbbbboo..',
    '..obbbllbbbbbbo.', '.obbbbbbbbbbbbbo', 'obbebbbbbbbbebbo', 'obbpbbbwbbbbpbbo', 'obbbbbbowbbbbbdo',
    'oddbbbbbbbbbbddo', '.oddddddddddddo.', '..oodddddddddoo.', '....oooooooooo..', '................', '................' ] },
  // リン：オレンジの結晶状
  phosphorus: { パレット: { o: '#8a4a10', b: '#ff9f43', l: '#ffe0b0', d: '#d0701a', ...E_FACE }, 絵: [
    '................', '.......oo.......', '......oblo......', '.....obllbo.....', '....obbbbbbo....',
    '...obbeebeebo...', '..obbbpebpebbo..', '.oblbbbbbbbbdo..', '..obbbbbbbbdo...', '...obbbbbbddo...',
    '....obbbbddo....', '.....obddddo....', '......oddo......', '.......oo.......', '................', '................' ] },
  // 硝酸性窒素：緑の六角分子
  nitrate: { パレット: { o: '#14604a', b: '#4dd0a8', l: '#b8ffe6', d: '#2a9a78', ...E_FACE }, 絵: [
    '................', '....oooooo......', '...oblllbbo.....', '..obbbbbbbbo....', '.obbeebbeebbo...',
    '.obbpebbpebbo...', '.obbbbbbbbbbo...', '..obbbbbbbbdo...', '...oddbbbbddo...', '....oooddooo....',
    '..oo......oo.o..', '.obbo....obbo...', '.obbo....obbo...', '..oo......oo....', '................', '................' ] },
  // 大腸菌群：黄色い桿菌と鞭毛
  coliform: { パレット: { o: '#7a7a20', b: '#e5e58c', l: '#fffff0', d: '#b8b850', ...E_FACE }, 絵: [
    '................', '................', '................', '..oooooooooo....', '.obbbllllbbbbo..',
    'obbeebbbbbeebbbo', 'obbpebbbbbpebddo', 'obbbbbbbbbbbbddo', '.oddbbbbbbbdddo.', '..oooooooooooo..',
    '.o.o.o.o.o.o.o..', '..o.o.o.o.o.o.o.', '................', '................', '................', '................' ] },
  // 泡沫：白い泡の集まり
  foam: { パレット: { o: '#8a9aa6', b: '#f4f4f4', l: '#ffffff', d: '#c8d4dc', ...E_FACE }, 絵: [
    '................', '...ooo...ooo....', '..oblbo.oblbo...', '..obbbooobbbo...', '.ooobbbbbbbooo..',
    'oblbobeebeebblo.', 'obbbobpebpebbbo.', 'obbbbbbbbbbbbddo', '.oobbbbbbbbbddo.', '.oblbooddoblbo..',
    '.obbbo.oo.obbo..', '..ooo......oo...', '................', '................', '................', '................' ] },
  // 油脂（FOG）：黄色いべたつく塊
  fog: { パレット: { o: '#7a6210', b: '#e8c547', l: '#fff2a8', d: '#b8962a', ...E_FACE }, 絵: [
    '................', '................', '....oooooo......', '..ooblllbbboo...', '.obbbbbbbbbbbo..',
    'obbbbbbbbbbbbbo.', 'obbbeebbeebbbdo.', 'obbbpebbpebbbdo.', 'obbbbbbbbbbbbdo.', 'obbbbbbbbbbbddo.',
    '.obddbbbbbddddo.', '.oobddddddddoo..', '..ob.oooooo.bo..', '..oo........oo..', '................', '................' ] },
  // 界面活性剤：ピンクのシャボン玉
  detergent: { パレット: { o: '#8a2a78', b: '#e66bd0', l: '#ffe0f8', d: '#b84aa4', c: '#8ee8ff', ...E_FACE }, 絵: [
    '................', '.....oooooo.....', '...oobllbbboo...', '..obbllbbbbbdo..', '.obbbbbbbbbbbdo.',
    '.obbeebbbbeebdo.', '.obbpebbbbpebdo.', '.obbbbbbbbbbbdo.', '.obbbbooobbbbdo.', '..obbbbbbbbbdo..',
    '..ocodddddddoco.', '...ooooooooooo..', '................', '................', '................', '................' ] },
  // ユスリカ幼虫：赤く細長い体節
  chironomid: { パレット: { o: '#5a1414', b: '#d34a4a', l: '#f59a9a', d: '#9a2a2a', n: '#7a1c1c', ...E_FACE }, 絵: [
    '................', '................', '................', '.oooo...........', 'obeebooooooooo..',
    'obpbbbbnbbnbbbo.', 'obbbbllbnbbnbbbo', 'obbbbbbbnbbnbbdo', '.oddbbbbnbbnbddo', '..ooddddnddnddo.',
    '...ooooooooooo..', '..o.o.o.o.o.....', '................', '................', '................', '................' ] },
  // ミズムシ：灰紫の平たい甲殻
  isopod: { パレット: { o: '#2e2e46', b: '#7d7d96', l: '#b4b4cc', d: '#585874', n: '#4a4a62', ...E_FACE }, 絵: [
    '................', '................', '..o...oooo...o..', '...o.obbbbo.o...', '..o.obeebeebo.o.',
    '...obbpebpebbo..', '..o.obbbbbbbo.o.', '...obllbbblbo...', '..o.obnnnnnbo.o.', '...obbbbbbbbbo..',
    '..o.obnnnnnbo.o.', '...oobbbbbbboo..', '..o..oddddo..o..', '.......oo.......', '................', '................' ] },
  // 硫化水素：黄緑の毒ガス雲とドクロ目
  h2s: { パレット: { o: '#4a5a10', b: '#b4d332', l: '#e4ff88', d: '#86a01c', k: '#1a2a00', ...E_FACE }, 絵: [
    '................', '....oo..........', '...obbooo...oo..', '..obllbbbooobbo.', '.obbbbbbbbbbbbbo',
    'obbbkkbbbbkkbbbo', 'obbkkkbbbbkkkbbo', 'obbbkkbbbbkkbbbo', 'obbbbbbkkbbbbbdo', '.obbbbbbbbbbbddo',
    '.oddbbbbbbbbddo.', '..ooddddddddoo..', '....oooooooo....', '................', '................', '................' ] },
  // 重金属：鉄色の角ばった塊
  heavymetal: { パレット: { o: '#2a3440', b: '#6c7a89', l: '#b8c4d0', d: '#48535f', r: '#a0522d', ...E_FACE }, 絵: [
    '................', '...oooooooooo...', '..oblllbbbbbbo..', '.obllbbbbbbbbdo.', '.obbbbbbbbbbbdo.',
    '.obbeebbbbeebdo.', '.obbpebbbbpebdo.', '.obbbbbrrbbbbdo.', '.obbbbbbbbbbddo.', '.obbbddbbbbbddo.',
    '.oddbbbbbbddddo.', '..oddddddddddo..', '...oooooooooo...', '................', '................', '................' ] },
  // 病原菌：赤紫のトゲ付き球
  pathogen: { パレット: { o: '#6a0a24', b: '#ff4d6d', l: '#ffb0c0', d: '#c02848', ...E_FACE }, 絵: [
    '................', '.o....o..o....o.', '..o..obbbo..o...', '...oobllbboo....', '..obbbbbbbbbo...',
    'o.obbeebbeebbo.o', '.oobbpebbpebboo.', '..obbbbbbbbbdo..', 'ooobbbbbbbbbdooo', '..obbbooobbbdo..',
    '.o.obddddddo.o..', 'o...oooooooo..o.', '..o..o....o.o...', '................', '................', '................' ] },
  // 汚泥浮上塊：黒褐色の大きな塊とガス泡
  sludgeball: { パレット: { o: '#1c140c', b: '#4a3a2a', l: '#7a634a', d: '#2e231a', w: '#c8b898', ...E_FACE }, 絵: [
    '................', '...w....w.......', '..wow..wow.w....', '...oooooooowow..', '..oblllbbbbooo..',
    '.obllbbbbbbbbbo.', 'obbbbbbbbbbbbbbo', 'obbbeebbbbeebbbo', 'obbbpebbbbpebbbo', 'obbbbbbbbbbbbbdo',
    'obbwbbbbbbbbbddo', '.obbbbbbbbbbddo.', '.oddddbbbddddo..', '..ooddddddddoo..', '....oooooooo....', '................' ] },
  // 中ボス1：巨大スカムマス（王冠風のこぶと牙）
  boss1: { パレット: { o: '#2a1c08', b: '#7a5a30', l: '#b08a50', d: '#523a1c', w: '#e0d4b0', r: '#ff3030', t: '#fff8e0' }, 絵: [
    '................', '..w.o..ww..o.w..', '.wow.oooooo.wow.', '..ooooblllboooo.', '.obbbbbbbbbbbbbo',
    'obbbbbbbbbbbbbbo', 'obbrrbbbbbbrrbbo', 'obbrrbbbbbbrrbbo', 'obbbbbbbbbbbbbdo', 'obbtbtbtbtbtbbdo',
    'obbbtbtbtbtbbbdo', '.oddbbbbbbbbddo.', '..oodddddddddoo.', '....oooooooooo..', '................', '................' ] },
  // 中ボス2：ユスリカ大群体（赤い成虫と羽）
  boss2: { パレット: { o: '#3a0808', b: '#b02a2a', l: '#e87070', d: '#701818', w: '#e8e8f8', v: '#a8a8d0', y: '#ffe030', k: '#111111' }, 絵: [
    '................', 'wwww........wwww', 'wvvwwo....oowvvw', '.wvvwoooooowvvw.', '..wwobbbbbbowwy.',
    '...obbllbbbbbo..', '..obyybbbbyybbo.', '..obykbbbbkybbo.', '..obbbbbbbbbbdo.', '...obbbbbbbbdo..',
    '...oddbbbbddo...', '....obddddbo....', '....oobddboo....', '.....oobbboo....', '......oooo......', '................' ] },
  // 最終ボス：汚泥バルキング大怪獣（紫の巨体、角、赤い目、牙）
  boss3: { パレット: { o: '#120818', b: '#3b2a4a', l: '#6a4f86', d: '#241830', r: '#ff2a2a', t: '#fff0d0', y: '#ffd030', s: '#8a6aa8' }, 絵: [
    'o..o........o..o', 'obo.o......o.obo', '.obooo....oooboo', '..oblsooooosblo.', '.obbbbbbbbbbbbbo',
    'obbbbbbbbbbbbbbo', 'obbrryybbbrryybo', 'obbrrrbbbbrrrbbo', 'obbbbbbbbbbbbbdo', 'obbbotbottbobbdo',
    'obbbottoottotbdo', '.obbbotbtbtobbdo', '.oddbbbbbbbbddo.', '..oodddddddddoo.', '.sos.oooooooo.so', '..s..........s..' ] },
});

// かわいく見せる後処理：きらきらの大きな目・ほっぺ・にっこり口を追加する
(function cutifyEnemies() {
  const CUTE = ['bod', 'ss', 'ammonia', 'nocardia', 'bulking', 'mite', 'scum', 'phosphorus', 'nitrate', 'coliform',
    'foam', 'fog', 'detergent', 'isopod', 'pathogen', 'sludgeball', 'heavymetal'];
  const setc = (rows, y, x, ch, only) => {
    if (y < 0 || y >= rows.length || x < 0 || x >= 16 || !only.includes(rows[y][x])) return;
    rows[y] = rows[y].slice(0, x) + ch + rows[y].slice(x + 1);
  };
  for (const id of CUTE) {
    const s = PIXEL_SPRITES[id];
    if (!s) continue;
    s.パレット = { ...s.パレット, q: '#ff8fa8' };
    const rows = s.絵.slice();
    const eyes = [];
    for (let y = 0; y < rows.length - 1; y++) {
      for (let x = 0; x < 15; x++) {
        if (rows[y].substr(x, 2) === 'ee' && /^(pe|ep)$/.test(rows[y + 1].substr(x, 2))) eyes.push([y, x]);
      }
      if (eyes.length) break;
    }
    if (eyes.length !== 2) continue;
    const [[y, xl], [, xr]] = eyes;
    const body = 'bld';
    // 目：黒目を大きく、左上にハイライト
    for (const x of [xl, xr]) {
      setc(rows, y, x, 'e', 'e'); setc(rows, y, x + 1, 'p', 'e');
      setc(rows, y + 1, x, 'p', 'pe'); setc(rows, y + 1, x + 1, 'p', 'pe');
    }
    // ほっぺ
    setc(rows, y + 2, xl - 1, 'q', body); setc(rows, y + 2, xr + 2, 'q', body);
    // にっこり口
    const mid = Math.floor((xl + 1 + xr) / 2);
    setc(rows, y + 2, mid, 'p', body); setc(rows, y + 2, mid + 1, 'p', body);
    s.絵 = rows;
  }
})();

// 図鑑の説明文
const DEX_TEXT = {
  bod: '下水に含まれる有機物のかたまり。微生物のエサになるが、増えすぎると水を汚す。動きは遅く、群れで押し寄せる。',
  ss: '水中をただよう細かな浮遊物質。濁りの原因で、沈みにくく集団でじわじわ迫ってくる。',
  ammonia: '有機物の分解で生じる水滴状の分子。魚にとって有毒で、硝化菌によって処理される。',
  nocardia: '枝分かれした糸状の放線菌。泡立ちやスカムの原因になり、しぶとく生き残る。',
  bulking: '汚泥がかさ高くなる「バルキング」の原因となる糸状菌。もつれた糸で沈殿を妨げる。',
  nematode: 'うねうねと素早く動く細長い後生動物。汚泥を食べる益虫でもあるが、ここでは敵として襲ってくる。',
  mite: '8本の脚で素早く動き回るダニ類。活性汚泥中の微小動物で、高速で突進してくる。',
  scum: '水面に浮いて層をつくる汚泥。泡をまとい、動きは遅いが体力が高い。',
  phosphorus: '富栄養化の原因となるリン。結晶状の体から弾を飛ばして遠距離攻撃をしてくる。',
  nitrate: '硝化の最終産物である硝酸性窒素。緑の分子が離れた位置から弾を撃ってくる。',
  coliform: '衛生指標となる大腸菌群。鞭毛で素早く逃げ回るが、倒すと多くの経験値をくれる。',
  foam: '界面活性剤などでできる白い泡の集まり。ふわふわ浮かびながら遠くから攻撃してくる。',
  fog: '油脂(Fats, Oils, Grease)のかたまり。配管や水面を詰まらせる、動きは遅いが非常に硬い敵。',
  detergent: '洗剤に含まれる界面活性剤。すばしこく逃げるが、倒すと大量の経験値を落とす。',
  chironomid: '水底の汚泥にすむユスリカの幼虫。赤い体で、大群となって一斉に襲いかかる。',
  isopod: '水路や処理施設に住むミズムシ。硬い甲殻で守られ、ゆっくり、しかし確実に迫ってくる。',
  h2s: '腐敗臭の元となる硫化水素。黄緑のガスが猛スピードで突っ込んでくる有毒物質。',
  heavymetal: '排水に混じる重金属。分解されず蓄積する、非常に硬い金属質の敵。',
  pathogen: '感染症を引き起こす病原菌。圧倒的な速度で飛びかかる危険な存在。',
  sludgeball: '腐敗したガスで浮き上がった汚泥の塊。巨体で体力が非常に高い。',
  boss1: '汚泥が巨大に固まって浮上した中ボス。大きな体で行く手をふさぐ。',
  boss2: 'ユスリカの幼虫が集まった大群体の中ボス。圧倒的な数と体力で迫ってくる。',
  boss3: 'バルキングが極限まで進行して現れた最終ボス。この怪獣を倒せば処理場に平和が戻る。'
};
