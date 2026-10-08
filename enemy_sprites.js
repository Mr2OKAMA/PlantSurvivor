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
