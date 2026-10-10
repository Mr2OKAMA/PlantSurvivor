'use strict';
/* 微生物サバイバーズ (Phaser 3) */

// ============================================================
// ゲーム設定 (数値・データはここに集約)
// ============================================================
const GAME_CONFIG = {
  タイトル: '微生物サバイバーズ',
  クリア時間分: 10,
  スキル最大所持数: 6,
  スキル最大レベル: 5,
  初期選択肢数: 3,
  拡張選択肢数: 4,
  メタ保存キー: 'microbeSurvivorsMeta_v1',

  // ---------- A. プレイアブルキャラクター ----------
  キャラクター: [
    { id: 'tsurigane', 名前: 'ツリガネムシ', タイプ: 'バランス・吸入型', 説明: '吸入で素早くエネルギーを集める。バランス型。',
      HP: 100, 速度: 120, 防御: 0, 回復: 0, 吸引: 1.5, 色: 0xbfe9ff, 初期スキル: 'tentacle' },
    { id: 'aspidisca', 名前: 'アスピディスカ', タイプ: '高速・近接型', 説明: '足の速さが武器。敵の懐で戦う。',
      HP: 80, 速度: 165, 防御: 0, 回復: 0, 吸引: 1.0, 色: 0xffd27a, 初期スキル: 'hypo' },
    { id: 'arcella', 名前: 'アルセラ', タイプ: '高耐久・シールド型', 説明: '殻で身を守る。周囲を回るろ過フィルターで防ぐ。',
      HP: 130, 速度: 105, 防御: 2, 回復: 0, 吸引: 1.0, 色: 0xd9a066, 初期スキル: 'filter' },
    { id: 'kumamushi', 名前: 'クマムシ', タイプ: '超高耐久・低速型', 説明: '極限環境に耐える。遅いが倒れにくい。',
      HP: 220, 速度: 85, 防御: 3, 回復: 0.3, 吸引: 1.0, 色: 0xb8a7e8, 初期スキル: 'scraper' },
    { id: 'midorimushi', 名前: 'ミドリムシ', タイプ: '自動回復・光合成型', 説明: '光合成でHPが自動回復する。',
      HP: 90, 速度: 115, 防御: 0, 回復: 1.2, 吸引: 1.0, 色: 0x6dff8a, 初期スキル: 'uv' },
    // ---- ショップで開放するキャラクター（解放価格: 処理ポイント）----
    { id: 'rotaria', 名前: 'ロタリア', タイプ: '回転・周回特化型', 説明: '繊毛の輪を回転させて戦う。周回スキルの数が+1される。',
      HP: 95, 速度: 110, 防御: 1, 回復: 0, 吸引: 1.2, 色: 0xff9ec4, 初期スキル: 'cilia', 特性: 'orbit', 特性名: '輪盤回転：周回スキルの数+1', 解放価格: 500 },
    { id: 'euprotes', 名前: 'ユープロテス', タイプ: '反撃・重装型', 説明: '硬い殻と棘状の繊毛を持つ。被弾すると衝撃波で反撃する。',
      HP: 140, 速度: 100, 防御: 2, 回復: 0, 吸引: 1.0, 色: 0xff7a5c, 初期スキル: 'nova', 特性: 'thorns', 特性名: '棘の反撃：被弾時に衝撃波', 解放価格: 800 },
    { id: 'tokophilia', 名前: 'トコフィリア', タイプ: '吸収・回復型', 説明: '吸盤触手で獲物を捕らえる。敵を倒すとHPを吸収する。',
      HP: 110, 速度: 105, 防御: 0, 回復: 0, 吸引: 1.8, 色: 0xc77dff, 初期スキル: 'sucker', 特性: 'drain', 特性名: '吸盤捕食：撃破でHP+0.6', 解放価格: 1200 },
  ],

  // ---------- B. スキル ----------
  // 種別: proj(単発弾) burst(全方位) spread(扇状) zone(設置) aura(周囲) lightning(即時) orbit(周回) nova(衝撃波) passive(パッシブ)
  スキル: {
    tentacle: { 名前: 'バネ状触手ビーム', 種別: 'proj', 説明: '最も近い敵に触手ビームを発射する。', dmg: 8, cd: 1.0, count: 1, speed: 420, r: 7, pierce: 0, life: 1.4, color: 0x9df7ff },
    blower:   { 名前: 'DOブロワー', 種別: 'burst', 説明: '全方位に気泡を吹き出す。', dmg: 7, cd: 2.2, count: 8, countStep: 2, speed: 260, r: 8, pierce: 1, life: 1.2, color: 0xe0fbff },
    pac:      { 名前: 'PAC凝集剤', 種別: 'zone', 説明: '敵を足止めして継続ダメージを与える凝集エリアを設置。', dmg: 4, cd: 3.5, count: 1, area: 70, life: 3.5, color: 0xffe08a },
    hypo:     { 名前: '次亜塩素酸スプレー', 種別: 'aura', 説明: '周囲の敵に継続ダメージを与える。', dmg: 3, cd: 0.5, count: 1, area: 85, color: 0xb6ff6a },
    uv:       { 名前: '紫外線照射器', 種別: 'lightning', 説明: 'ランダムな敵に紫外線を照射する。', dmg: 12, cd: 1.6, count: 2, range: 450, color: 0xd59bff },
    filter:   { 名前: 'ろ過フィルター', 種別: 'orbit', 説明: '自分の周りを回り、触れた敵を傷つける。', dmg: 6, cd: 0, count: 2, area: 80, rot: 3, r: 12, color: 0xffffff },
    ozone:    { 名前: 'オゾン発生器', 種別: 'spread', 説明: '前方に扇状のオゾンを発射する。', dmg: 6, cd: 1.4, count: 3, speed: 380, spread: 0.5, r: 6, pierce: 0, life: 0.8, color: 0xa0b4ff },
    scraper:  { 名前: '汚泥掻き寄せ機', 種別: 'proj', 説明: '低速で敵を貫通する大きな刃。', dmg: 15, cd: 2.8, count: 1, speed: 160, r: 22, pierce: 99, life: 2.5, color: 0xc9a27a },
    cilia:    { 名前: '繊毛の輪', 種別: 'orbit', 説明: '高速回転する繊毛の輪が敵を払う。', dmg: 5, cd: 0, count: 3, area: 65, rot: 5, r: 10, color: 0xffc2dc },
    sucker:   { 名前: '吸盤触手', 種別: 'proj', 説明: '敵に吸盤触手を伸ばす。ゆっくりだが貫通する。', dmg: 10, cd: 1.3, count: 1, speed: 300, r: 11, pierce: 2, life: 1.0, color: 0xd9a3ff },
    nova:     { 名前: '逆洗パルス', 種別: 'nova', 説明: '自分を中心に衝撃波を広げる。', dmg: 10, cd: 3.0, count: 1, area: 160, color: 0x7fd8ff },
    // パッシブ (stat: 加算する能力, per: 1Lvあたりの加算値)
    ph:       { 名前: 'pH調整剤', 種別: 'passive', 説明: '移動速度が上がる。', stat: 'speed', per: 0.08, 効果文: '移動速度 +8%' },
    pump:     { 名前: '返送汚泥ポンプ', 種別: 'passive', 説明: 'HPが自動回復する。', stat: 'regen', per: 0.4, 効果文: 'HP回復 +0.4/秒' },
    sludge:   { 名前: '活性汚泥', 種別: 'passive', 説明: '与えるダメージが増える。', stat: 'power', per: 0.10, 効果文: '威力 +10%' },
    tank:     { 名前: '反応槽拡張', 種別: 'passive', 説明: '最大HPが増える。', stat: 'hpMul', per: 0.15, 効果文: '最大HP +15%' },
    panel:    { 名前: '制御盤', 種別: 'passive', 説明: 'スキルの冷却時間が短くなる。', stat: 'cd', per: -0.08, 効果文: '冷却時間 -8%' },
    magnet:   { 名前: '磁気ピックアップ', 種別: 'passive', 説明: 'エネルギーの吸引範囲が広がる。', stat: 'magnet', per: 0.3, 効果文: '吸引範囲 +30%' },
    enzyme:   { 名前: '酵素剤', 種別: 'passive', 説明: '獲得経験値が増える。', stat: 'xp', per: 0.10, 効果文: '経験値 +10%' },
    // 進化スキル (レベル固定)
    blower_evo:   { 名前: '超高圧エアジェット', 種別: 'burst', evo: true, 説明: '最も近い敵を追尾する高圧空気を超高速で連射する。', homing: true, dmg: 16, cd: 0.12, count: 1, speed: 340, r: 10, pierce: 4, life: 1.4, color: 0xffffff },
    tentacle_evo: { 名前: '双頭バネ触手', 種別: 'proj', evo: true, 説明: '貫通する触手ビームを連射する。', dmg: 16, cd: 0.7, count: 4, speed: 520, r: 9, pierce: 3, life: 1.4, color: 0xffb0ff },
    hypo_evo:     { 名前: '次亜塩素酸ミスト', 種別: 'aura', evo: true, 説明: '広範囲に強力な消毒ミストを噴霧する。', dmg: 8, cd: 0.4 / 3, count: 1, area: 150, color: 0xd9ff8a },
    filter_evo:   { 名前: '高性能メンブレン', 種別: 'orbit', evo: true, 説明: '多数のメンブレンが高速で周回する。', dmg: 12, cd: 0, count: 6, area: 110, rot: 20, r: 14, color: 0xfff2a0 },
    uv_evo:       { 名前: '殺菌ランプ群', 種別: 'lightning', evo: true, 説明: '大量の紫外線で敵を焼き払う。', dmg: 22, cd: 1.0, count: 6, range: 520, color: 0xff9bf0 },
  },

  // 進化組み合わせ表 (基本スキルがMAXLv + 必要スキル所持 + 宝箱取得)
  進化: [
    { 基本: 'blower',   必要: 'pump',   結果: 'blower_evo' },
    { 基本: 'tentacle', 必要: 'sludge', 結果: 'tentacle_evo' },
    { 基本: 'hypo',     必要: 'tank',   結果: 'hypo_evo' },
    { 基本: 'filter',   必要: 'panel',  結果: 'filter_evo' },
    { 基本: 'uv',       必要: 'ph',     結果: 'uv_evo' },
  ],

  // ---------- C. 敵キャラクター ----------
  敵: {
    bod:       { 名前: 'BOD(有機物)', hp: 6, 速度: 40, 攻撃: 3, 経験値: 1, 半径: 9, 色: 0x8b5a2b },
    ss:        { 名前: 'SS(浮遊物質)', hp: 8, 速度: 45, 攻撃: 3, 経験値: 1, 半径: 9, 色: 0xb9b39a },
    ammonia:   { 名前: 'アンモニア', hp: 10, 速度: 55, 攻撃: 4, 経験値: 1, 半径: 9, 色: 0x7ad1ff },
    nocardia:  { 名前: 'ノカルディア', hp: 14, 速度: 50, 攻撃: 5, 経験値: 2, 半径: 10, 色: 0x9b6b3a },
    bulking:   { 名前: 'バルキング糸状菌', hp: 20, 速度: 50, 攻撃: 5, 経験値: 2, 半径: 11, 色: 0xd6c36b },
    nematode:  { 名前: 'センチュウ', hp: 40, 速度: 125, 攻撃: 8, 経験値: 2, 半径: 10, 色: 0xf1d0b0, 行動: 'fast' },
    mite:      { 名前: 'ダニ類', hp: 45, 速度: 140, 攻撃: 9, 経験値: 3, 半径: 11, 色: 0xc44d3a, 行動: 'fast' },
    scum:      { 名前: 'スカム', hp: 60, 速度: 30, 攻撃: 8, 経験値: 4, 半径: 16, 色: 0x6e5a3f },
    phosphorus:{ 名前: 'リン', hp: 30, 速度: 50, 攻撃: 8, 経験値: 2, 半径: 9, 色: 0xff9f43, 行動: 'ranged' },
    nitrate:   { 名前: '硝酸性窒素', hp: 40, 速度: 50, 攻撃: 9, 経験値: 2, 半径: 9, 色: 0x4dd0a8, 行動: 'ranged' },
    coliform:  { 名前: '大腸菌群', hp: 40, 速度: 110, 攻撃: 5, 経験値: 10, 半径: 8, 色: 0xe5e58c, 行動: 'flee' },
    foam:      { 名前: '泡沫(ファーミング)', hp: 70, 速度: 45, 攻撃: 9, 経験値: 3, 半径: 15, 色: 0xf4f4f4, 行動: 'ranged' },
    fog:       { 名前: '油脂(FOG)', hp: 260, 速度: 32, 攻撃: 12, 経験値: 5, 半径: 16, 色: 0xe8c547, 行動: 'tank' },
    detergent: { 名前: '界面活性剤', hp: 50, 速度: 95, 攻撃: 7, 経験値: 15, 半径: 11, 色: 0xe66bd0, 行動: 'flee' },
    chironomid:{ 名前: 'ユスリカ幼虫', hp: 35, 速度: 120, 攻撃: 9, 経験値: 4, 半径: 13, 色: 0xd34a4a, 行動: 'swarm' },
    isopod:    { 名前: 'ミズムシ', hp: 300, 速度: 55, 攻撃: 14, 経験値: 5, 半径: 14, 色: 0x7d7d96, 行動: 'tank' },
    h2s:       { 名前: '硫化水素', hp: 60, 速度: 150, 攻撃: 11, 経験値: 4, 半径: 11, 色: 0xb4d332, 行動: 'fast' },
    heavymetal:{ 名前: '重金属', hp: 600, 速度: 45, 攻撃: 18, 経験値: 7, 半径: 15, 色: 0x6c7a89, 行動: 'tank' },
    pathogen:  { 名前: '病原菌', hp: 70, 速度: 165, 攻撃: 13, 経験値: 5, 半径: 10, 色: 0xff4d6d, 行動: 'fast' },
    sludgeball:{ 名前: '汚泥浮上塊', hp: 900, 速度: 38, 攻撃: 20, 経験値: 8, 半径: 20, 色: 0x4a3a2a, 行動: 'tank' },
    boss1:     { 名前: '【中ボス】巨大スカムマス', hp: 1500, 速度: 45, 攻撃: 18, 経験値: 60, 半径: 42, 色: 0x7a5a30, ボス: true },
    boss2:     { 名前: '【中ボス】ユスリカ大群体', hp: 4000, 速度: 60, 攻撃: 24, 経験値: 100, 半径: 46, 色: 0xb02a2a, ボス: true },
    boss3:     { 名前: '【最終ボス】汚泥バルキング大怪獣', hp: 12000, 速度: 55, 攻撃: 32, 経験値: 300, 半径: 60, 色: 0x3b2a4a, ボス: true, 最終: true },
  },

  // ウェーブ構成: 開始分〜終了分の間、間隔秒ごとに 出現 を実行 (数は時間経過で増加)
  ウェーブ: [
    { 開始分: 0, 終了分: 2, 間隔: 1.2, 出現: [{ 敵: 'bod', 数: 3 }, { 敵: 'ss', 数: 2 }] },
    { 開始分: 1, 終了分: 3, 間隔: 2.0, 出現: [{ 敵: 'ammonia', 数: 3 }] },
    { 開始分: 2, 終了分: 4, 間隔: 2.5, 出現: [{ 敵: 'nocardia', 数: 3 }, { 敵: 'bulking', 数: 2 }] },
    { 開始分: 3, 終了分: 6, 間隔: 2.5, 出現: [{ 敵: 'nematode', 数: 3 }, { 敵: 'phosphorus', 数: 2 }] },
    { 開始分: 3, 終了分: 5, 間隔: 6.0, 出現: [{ 敵: 'scum', 数: 2 }] },
    { 開始分: 4, 終了分: 7, 間隔: 3.0, 出現: [{ 敵: 'mite', 数: 3 }, { 敵: 'nitrate', 数: 2 }, { 敵: 'coliform', 数: 2 }] },
    { 開始分: 5, 終了分: 8, 間隔: 5.0, 出現: [{ 敵: 'foam', 数: 2 }, { 敵: 'detergent', 数: 3 }] },
    { 開始分: 6, 終了分: 9, 間隔: 4.0, 出現: [{ 敵: 'fog', 数: 2 }, { 敵: 'chironomid', 数: 12 }] },
    { 開始分: 7, 終了分: 10, 間隔: 4.0, 出現: [{ 敵: 'isopod', 数: 2 }, { 敵: 'h2s', 数: 4 }, { 敵: 'pathogen', 数: 3 }, { 敵: 'chironomid', 数: 15 }] },
    { 開始分: 8, 終了分: 11, 間隔: 5.0, 出現: [{ 敵: 'heavymetal', 数: 2 }, { 敵: 'sludgeball', 数: 1 }] },
  ],
  ボス出現: [
    { 分: 3, 敵: 'boss1' },
    { 分: 6, 敵: 'boss2' },
    { 分: 10, 敵: 'boss3' },
  ],
  敵上限数: 350,

  // ---------- メタプログレッション ----------
  ショップ: [
    { id: 'reroll', 名前: 'リロール回数 +1', 説明: 'レベルアップ時の選択肢を引き直せる回数が増える。', 最大: 3, 価格: n => 150 * (n + 1) },
    { id: 'hp', 名前: '基礎HP +10%', 説明: '全キャラの最大HPが永続的に増える。', 最大: 5, 価格: n => 100 * (n + 1) },
    { id: 'speed', 名前: '移動速度 +5%', 説明: '移動速度が永続的に上がる。', 最大: 5, 価格: n => 100 * (n + 1) },
    { id: 'power', 名前: '与ダメージ +5%', 説明: '与えるダメージが永続的に増える。', 最大: 5, 価格: n => 120 * (n + 1) },
    { id: 'area', 名前: '攻撃範囲 +5%', 説明: '範囲攻撃・周回スキルの範囲が広がる。', 最大: 5, 価格: n => 100 * (n + 1) },
    { id: 'cd', 名前: 'クールダウン短縮 -3%', 説明: 'スキルの冷却時間が短くなる。', 最大: 5, 価格: n => 130 * (n + 1) },
    { id: 'xp', 名前: '経験値獲得量 +10%', 説明: '獲得する経験値が増える。', 最大: 5, 価格: n => 100 * (n + 1) },
    { id: 'magnet', 名前: '吸引範囲 +10%', 説明: '経験値・アイテムの吸引範囲が広がる。', 最大: 5, 価格: n => 80 * (n + 1) },
    { id: 'regen', 名前: 'HP自然回復 +0.2/秒', 説明: 'HPが毎秒自動回復する。', 最大: 5, 価格: n => 120 * (n + 1) },
    { id: 'guard', 名前: '被ダメージ軽減 -3%', 説明: '受けるダメージが減る。', 最大: 5, 価格: n => 130 * (n + 1) },
    { id: 'startLv', 名前: '開始レベル +1', 説明: 'ラン開始時のレベルが上がる。', 最大: 3, 価格: n => 400 * (n + 1) },
    { id: 'revive', 名前: '復活 +1', 説明: '倒れてもHP半分で復活する（1ランにつき購入回数分）。', 最大: 1, 価格: n => 600 },
    { id: 'skip', 名前: 'スキップ回数 +1', 説明: 'レベルアップ時に選択を見送り、HPを15%回復＋10pt獲得できる。', 最大: 3, 価格: n => 120 * (n + 1) },
    { id: 'block', 名前: 'ブロック回数 +1', 説明: 'レベルアップ時にスキルを1つ、そのラン中の選択肢から除外できる。', 最大: 3, 価格: n => 150 * (n + 1) },
    { id: 'pointMul', 名前: '獲得ポイント +10%', 説明: 'ラン終了時の獲得ポイントが増える。', 最大: 5, 価格: n => 150 * (n + 1) },
    { id: 'rarity', 名前: '選択肢の質アップ', 説明: '育成中のスキルが選択肢に出やすくなる。', 最大: 3, 価格: n => 150 * (n + 1) },
    { id: 'bossBonus', 名前: 'ボス撃破ボーナス', 説明: 'ボス撃破ごとに追加ポイント +50。', 最大: 3, 価格: n => 150 * (n + 1) },
  ],
};

// ============================================================
// 永続データ (localStorage)
// ============================================================
const Meta = {
  data: { points: 0, clears: 0, choices4: false, reroll: 0, hp: 0, speed: 0, power: 0, area: 0, cd: 0, xp: 0, magnet: 0, regen: 0, guard: 0,
    startLv: 0, revive: 0, skip: 0, block: 0, pointMul: 0, rarity: 0, bossBonus: 0, unlocked: [], bestiary: [] },
  load() {
    try {
      const s = localStorage.getItem(GAME_CONFIG.メタ保存キー);
      if (s) Object.assign(this.data, JSON.parse(s));
    } catch (e) { /* 保存不可環境では初期値のまま */ }
  },
  save() {
    try { localStorage.setItem(GAME_CONFIG.メタ保存キー, JSON.stringify(this.data)); } catch (e) { /* ignore */ }
  },
};
Meta.load();

// ============================================================
// ユーティリティ
// ============================================================
const $ = id => document.getElementById(id);
const rnd = (a, b) => a + Math.random() * (b - a);
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const SK = GAME_CONFIG.スキル;
const EN = GAME_CONFIG.敵;

// ============================================================
// ゲーム本体
// ============================================================
const G = {
  state: 'menu', // menu | play | levelup | over
  selChar: GAME_CONFIG.キャラクター[0].id,
  scene: null,
  keys: {},
  joy: { active: false, id: null, sx: 0, sy: 0, dx: 0, dy: 0 },
};
let R = null; // 1プレイ分の状態

function newRun() {
  const ch = GAME_CONFIG.キャラクター.find(c => c.id === G.selChar);
  const maxHp = Math.round(ch.HP * (1 + 0.1 * Meta.data.hp));
  R = {
    ch, t: 0, kills: 0, over: false, won: false,
    p: { x: 0, y: 0, hp: maxHp, maxHp, inv: 0, lv: 1, xp: 0, xpNext: xpNeed(1), skills: {}, timers: {}, mods: null, face: 0 },
    enemies: [], bullets: [], ebullets: [], orbs: [], chests: [], zones: [], fx: [], novas: [],
    waveT: GAME_CONFIG.ウェーブ.map(() => 0), bossDone: {}, nextId: 1,
    pending: 0, rerolls: Meta.data.reroll, skips: Meta.data.skip, blocks: Meta.data.block, blocked: new Set(),
    revives: Meta.data.revive, bossKills: 0, bonusPts: 0, toast: '', toastT: 0, hudT: 0, flash: 0,
    orbitAng: 0,
  };
  const sl = 1 + Meta.data.startLv;
  R.p.lv = sl; R.p.xpNext = xpNeed(sl);
  addSkill(ch.初期スキル);
  recalc();
  R.p.hp = R.p.maxHp;
}

function xpNeed(lv) { return Math.floor(4 + lv * 5 + lv * lv * 0.5); }

function addSkill(id) { R.p.skills[id] = (R.p.skills[id] || 0) + 1; R.p.timers[id] = R.p.timers[id] || 0; }

function recalc() {
  const p = R.p, ch = R.ch;
  const m = { power: 1, cd: 1, area: 1, speed: 1, regen: ch.回復, hpMul: 1, magnet: 1, xp: 1 };
  const md = Meta.data;
  m.speed += 0.05 * md.speed; m.power += 0.05 * md.power; m.area += 0.05 * md.area;
  m.cd -= 0.03 * md.cd; m.xp += 0.1 * md.xp; m.magnet += 0.1 * md.magnet; m.regen += 0.2 * md.regen;
  for (const id in p.skills) {
    const d = SK[id];
    if (d.種別 === 'passive') m[d.stat] += d.per * p.skills[id];
  }
  m.cd = Math.max(0.4, m.cd);
  p.mods = m;
  const base = Math.round(ch.HP * (1 + 0.1 * Meta.data.hp) * m.hpMul);
  const diff = base - p.maxHp;
  p.maxHp = base;
  if (diff > 0) p.hp += diff;
}

function skillStats(id) {
  const d = SK[id], lv = R.p.skills[id], m = R.p.mods;
  const f = d.evo ? 0 : lv - 1;
  return {
    dmg: d.dmg * (1 + 0.3 * f) * m.power,
    cd: Math.max(0.1, d.cd * (1 - 0.06 * f) * m.cd),
    count: d.count + Math.floor(f / 2) * (d.countStep || 1) + (d.種別 === 'orbit' && R.ch.特性 === 'orbit' ? 1 : 0),
    area: (d.area || 1) * (1 + 0.1 * f),
  };
}

function thorns() {
  if (R.ch.特性 !== 'thorns') return;
  R.novas.push({ x: R.p.x, y: R.p.y, r: 0, max: 130 * R.p.mods.area, dmg: 15 * R.p.mods.power, hit: new Set(), color: 0xff7a5c });
}

function toast(msg) { R.toast = msg; R.toastT = 3; }

// ---------- 敵 ----------
function spawnEnemy(id, hpMul) {
  const d = EN[id], W = G.scene.scale.width, H = G.scene.scale.height;
  const rad = Math.max(W, H) / 2 + 60, a = Math.random() * Math.PI * 2;
  R.enemies.push({
    id: R.nextId++, def: d, key: id, x: R.p.x + Math.cos(a) * rad, y: R.p.y + Math.sin(a) * rad,
    hp: d.hp * hpMul, maxHp: d.hp * hpMul, r: d.半径, flash: 0, slow: 0, oc: 0, dead: false,
  });
}

function updateSpawns(dt) {
  const min = R.t / 60;
  if (R.enemies.length < GAME_CONFIG.敵上限数) {
    GAME_CONFIG.ウェーブ.forEach((w, i) => {
      if (min < w.開始分 || min >= w.終了分) return;
      R.waveT[i] -= dt;
      if (R.waveT[i] > 0) return;
      R.waveT[i] = w.間隔;
      const mult = 1 + min * 0.1, hpMul = 1 + min * 0.15;
      w.出現.forEach(g => {
        const n = Math.round(g.数 * mult);
        for (let k = 0; k < n; k++) spawnEnemy(g.敵, hpMul);
      });
    });
  }
  GAME_CONFIG.ボス出現.forEach((b, i) => {
    if (min >= b.分 && !R.bossDone[i]) {
      R.bossDone[i] = true;
      spawnEnemy(b.敵, 1);
      SFX.play('boss');
      toast(`警告！ ${EN[b.敵].名前} が出現！`);
    }
  });
}

function hurt(e, dmg) {
  if (e.dead) return;
  e.hp -= dmg; e.flash = 0.08;
  popup(e.x, e.y - e.r, String(Math.round(dmg)), '#ffffff');
  if (e.hp <= 0) killEnemy(e);
}

function killEnemy(e) {
  e.dead = true; R.kills++;
  SFX.play(e.def.ボス ? 'bossKill' : 'kill', 0.04);
  if (!Meta.data.bestiary.includes(e.key)) {
    Meta.data.bestiary.push(e.key); Meta.save();
    toast(`図鑑登録：${e.def.名前} (+1図鑑pt)`);
  }
  dropOrb(e.x, e.y, e.def.経験値);
  if (R.ch.特性 === 'drain') R.p.hp = Math.min(R.p.maxHp, R.p.hp + 0.6);
  if (e.def.ボス) {
    R.chests.push({ x: e.x, y: e.y });
    R.bossKills++;
    if (e.def.最終) win();
  }
}

function dropOrb(x, y, v) {
  if (R.orbs.length > 400) { pick(R.orbs).v += v; return; }
  R.orbs.push({ x: x + rnd(-6, 6), y: y + rnd(-6, 6), v, mag: false });
}

// ---------- 発射 ----------
function nearestEnemies(n, range) {
  const p = R.p, list = [];
  for (const e of R.enemies) {
    if (e.dead) continue;
    const d = Math.hypot(e.x - p.x, e.y - p.y);
    if (d < range) list.push({ e, d });
  }
  list.sort((a, b) => a.d - b.d);
  return list.slice(0, n).map(o => o.e);
}

function shoot(d, s, ang) {
  R.bullets.push({
    x: R.p.x, y: R.p.y, vx: Math.cos(ang) * d.speed, vy: Math.sin(ang) * d.speed,
    dmg: s.dmg, r: d.r * (d.種別 === 'proj' ? s.area : 1), life: d.life, pierce: d.pierce, color: d.color, hit: new Set(), homing: !!d.homing, speed: d.speed,
  });
}

function fireSkill(id) {
  const d = SK[id], s = skillStats(id), p = R.p;
  switch (d.種別) {
    case 'proj': {
      const targets = nearestEnemies(s.count, 700);
      if (!targets.length) return false;
      for (let i = 0; i < s.count; i++) {
        const t = targets[i % targets.length];
        const base = Math.atan2(t.y - p.y, t.x - p.x);
        shoot(d, s, base + (i >= targets.length ? rnd(-0.15, 0.15) : 0));
      }
      return true;
    }
    case 'burst': {
      if (d.homing) {
        const t = nearestEnemies(1, 700)[0];
        if (!t) return false;
        shoot(d, s, Math.atan2(t.y - p.y, t.x - p.x));
        return true;
      }
      const off = Math.random() * 6.28;
      for (let i = 0; i < s.count; i++) shoot(d, s, off + (i / s.count) * Math.PI * 2);
      return true;
    }
    case 'spread': {
      const t = nearestEnemies(1, 700)[0];
      if (!t) return false;
      const base = Math.atan2(t.y - p.y, t.x - p.x);
      for (let i = 0; i < s.count; i++) shoot(d, s, base + (s.count === 1 ? 0 : (i / (s.count - 1) - 0.5) * d.spread * 2));
      return true;
    }
    case 'zone': {
      const t = nearestEnemies(s.count, 500);
      for (let i = 0; i < s.count; i++) {
        const tgt = t[i % Math.max(1, t.length)];
        const x = tgt ? tgt.x : p.x + rnd(-150, 150), y = tgt ? tgt.y : p.y + rnd(-150, 150);
        R.zones.push({ x, y, r: s.area * R.p.mods.area, life: d.life, dmg: s.dmg, tick: 0, color: d.color });
      }
      return true;
    }
    case 'lightning': {
      const targets = nearestEnemies(40, d.range).sort(() => Math.random() - 0.5).slice(0, s.count);
      if (!targets.length) return false;
      targets.forEach(e => {
        hurt(e, s.dmg);
        R.fx.push({ x1: p.x, y1: p.y - 200, x2: e.x, y2: e.y, t: 0.15, color: d.color });
      });
      return true;
    }
    case 'nova':
      R.novas.push({ x: p.x, y: p.y, r: 0, max: s.area * R.p.mods.area, dmg: s.dmg, hit: new Set(), color: d.color });
      return true;
  }
  return false;
}

function updateSkills(dt) {
  const p = R.p;
  R.orbitAng += dt;
  for (const id in p.skills) {
    const d = SK[id];
    if (d.種別 === 'passive') continue;
    const s = skillStats(id);
    if (d.種別 === 'aura') {
      p.timers[id] -= dt;
      if (p.timers[id] <= 0) {
        p.timers[id] = s.cd;
        const rad = s.area * p.mods.area;
        for (const e of R.enemies) if (!e.dead && Math.hypot(e.x - p.x, e.y - p.y) < rad + e.r) hurt(e, s.dmg);
      }
    } else if (d.種別 === 'orbit') {
      const rad = s.area * p.mods.area;
      for (let i = 0; i < s.count; i++) {
        const a = R.orbitAng * d.rot + (i / s.count) * Math.PI * 2;
        const ox = p.x + Math.cos(a) * rad, oy = p.y + Math.sin(a) * rad;
        for (const e of R.enemies) {
          if (e.dead || e.oc > 0) continue;
          if (Math.hypot(e.x - ox, e.y - oy) < d.r + e.r) { hurt(e, s.dmg); e.oc = 0.35; }
        }
      }
    } else {
      p.timers[id] -= dt;
      if (p.timers[id] <= 0 && fireSkill(id)) p.timers[id] = s.cd;
      else if (p.timers[id] <= 0) p.timers[id] = 0.2;
    }
  }
}

function updateProjectiles(dt) {
  for (const b of R.bullets) {
    if (b.homing) {
      let t = null, td = Infinity;
      for (const e of R.enemies) {
        if (e.dead || b.hit.has(e.id)) continue;
        const dd = Math.hypot(e.x - b.x, e.y - b.y);
        if (dd < td) { td = dd; t = e; }
      }
      if (t) {
        const want = Math.atan2(t.y - b.y, t.x - b.x), cur = Math.atan2(b.vy, b.vx);
        let diff = want - cur;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        const na = cur + Math.max(-12 * dt, Math.min(12 * dt, diff));
        b.vx = Math.cos(na) * b.speed; b.vy = Math.sin(na) * b.speed;
      }
    }
    b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
    for (const e of R.enemies) {
      if (e.dead || b.hit.has(e.id)) continue;
      if (Math.hypot(e.x - b.x, e.y - b.y) < b.r + e.r) {
        b.hit.add(e.id); hurt(e, b.dmg);
        if (b.pierce-- <= 0) { b.life = 0; break; }
      }
    }
  }
  R.bullets = R.bullets.filter(b => b.life > 0);

  for (const z of R.zones) {
    z.life -= dt; z.tick -= dt;
    const tick = z.tick <= 0;
    if (tick) z.tick = 0.4;
    for (const e of R.enemies) {
      if (e.dead || Math.hypot(e.x - z.x, e.y - z.y) > z.r + e.r) continue;
      e.slow = 0.2;
      if (tick) hurt(e, z.dmg);
    }
  }
  R.zones = R.zones.filter(z => z.life > 0);

  for (const n of R.novas) {
    n.r += (n.max / 0.6) * dt;
    for (const e of R.enemies) {
      if (e.dead || n.hit.has(e.id)) continue;
      if (Math.hypot(e.x - n.x, e.y - n.y) < n.r + e.r) { n.hit.add(e.id); hurt(e, n.dmg); }
    }
  }
  R.novas = R.novas.filter(n => n.r < n.max);
  R.fx.forEach(f => { f.t -= dt; });
  R.fx = R.fx.filter(f => f.t > 0);
}

// ---------- 敵・プレイヤー ----------
function updateEnemies(dt) {
  const p = R.p;
  for (const e of R.enemies) {
    e.flash -= dt; e.oc -= dt;
    const dx = p.x - e.x, dy = p.y - e.y, d = Math.hypot(dx, dy) || 1;
    if (d > 1400) { e.x = p.x - dx / d * 700; e.y = p.y - dy / d * 700; }
    const sp = e.def.速度 * (e.slow > 0 ? 0.4 : 1);
    e.slow -= dt;
    const beh = e.def.行動;
    let dir = 1;
    if (beh === 'ranged') {
      if (d < 260) dir = d < 200 ? -0.5 : 0;
      e.shot = (e.shot ?? rnd(0, 2.5)) - dt;
      if (e.shot <= 0 && d < 520) {
        e.shot = 2.5;
        R.ebullets.push({ x: e.x, y: e.y, vx: dx / d * 220, vy: dy / d * 220, dmg: e.def.攻撃, r: 5, life: 4 });
      }
    } else if (beh === 'flee') {
      dir = d < 230 ? -1 : (d > 330 ? 1 : 0);
    }
    e.x += dx / d * sp * dt * dir; e.y += dy / d * sp * dt * dir;
    if (p.inv <= 0 && d < e.r + 10) {
      const dmg = Math.max(1, Math.round((e.def.攻撃 - R.ch.防御) * (1 - 0.03 * Meta.data.guard)));
      p.hp -= dmg; p.inv = 0.5; R.flash = 0.15; SFX.play('hurt', 0.1);
      popup(p.x, p.y - 14, '-' + dmg, '#ff6666');
      thorns();
    }
  }
  R.enemies = R.enemies.filter(e => !e.dead);
  for (const b of R.ebullets) {
    b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt;
    if (p.inv <= 0 && Math.hypot(p.x - b.x, p.y - b.y) < b.r + 10) {
      const dmg = Math.max(1, Math.round((b.dmg - R.ch.防御) * (1 - 0.03 * Meta.data.guard)));
      p.hp -= dmg; p.inv = 0.5; R.flash = 0.15; b.life = 0; SFX.play('hurt', 0.1);
      popup(p.x, p.y - 14, '-' + dmg, '#ff6666');
      thorns();
    }
  }
  R.ebullets = R.ebullets.filter(b => b.life > 0);
  if (p.hp <= 0) {
    if (R.revives > 0) {
      R.revives--; p.hp = p.maxHp / 2; p.inv = 2; R.flash = 0.3;
      toast('復活した！');
    } else lose();
  }
}

function updateOrbs(dt) {
  const p = R.p, mr = 70 * p.mods.magnet * R.ch.吸引;
  for (const o of R.orbs) {
    const d = Math.hypot(p.x - o.x, p.y - o.y);
    if (d < mr) o.mag = true;
    if (o.mag) { o.x += (p.x - o.x) / d * 420 * dt; o.y += (p.y - o.y) / d * 420 * dt; }
    if (d < 14) { o.got = true; SFX.play('xp', 0.05); gainXp(o.v * p.mods.xp); }
  }
  R.orbs = R.orbs.filter(o => !o.got);
  for (const c of R.chests) if (Math.hypot(p.x - c.x, p.y - c.y) < 24) { c.got = true; openChest(); }
  R.chests = R.chests.filter(c => !c.got);
}

function gainXp(v) {
  const p = R.p;
  p.xp += v;
  while (p.xp >= p.xpNext) {
    p.xp -= p.xpNext; p.lv++; p.xpNext = xpNeed(p.lv); R.pending++;
  }
  if (R.pending > 0 && G.state === 'play') showLevelUp();
}

function openChest() {
  const p = R.p;
  for (const ev of GAME_CONFIG.進化) {
    if (p.skills[ev.基本] >= GAME_CONFIG.スキル最大レベル && p.skills[ev.必要]) {
      delete p.skills[ev.基本]; delete p.timers[ev.基本];
      p.skills[ev.結果] = 1; p.timers[ev.結果] = 0;
      toast(`進化！ ${SK[ev.基本].名前} → ${SK[ev.結果].名前}`);
      recalc();
      return;
    }
  }
  const results = GAME_CONFIG.進化.map(ev => ev.結果);
  const ups = Object.keys(p.skills).filter(id => !results.includes(id) && p.skills[id] < GAME_CONFIG.スキル最大レベル);
  if (ups.length) {
    const id = ups[Math.floor(Math.random() * ups.length)];
    p.skills[id]++;
    toast(`宝箱：${SK[id].名前} が Lv${p.skills[id]} に上がった`);
    recalc();
    return;
  }
  p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.3);
  toast('宝箱：HPを回復した');
}

// ---------- レベルアップ ----------
function levelChoices() {
  const p = R.p, max = GAME_CONFIG.スキル最大レベル, full = Object.keys(p.skills).length >= GAME_CONFIG.スキル最大所持数;
  const pool = [];
  for (const id in p.skills) if (!SK[id].evo && p.skills[id] < max && !R.blocked.has(id)) pool.push(id);
  if (!full) for (const id in SK) if (!SK[id].evo && !p.skills[id] && !R.blocked.has(id)) pool.push(id);
  const bias = 0.5 * Meta.data.rarity;
  const key = id => Math.pow(Math.random(), 1 / (1 + (p.skills[id] ? bias * p.skills[id] : 0)));
  const keys = {};
  pool.forEach(id => { keys[id] = key(id); });
  pool.sort((a, b) => keys[b] - keys[a]);
  const n = Meta.data.choices4 ? GAME_CONFIG.拡張選択肢数 : GAME_CONFIG.初期選択肢数;
  return pool.slice(0, n);
}

function showLevelUp() {
  G.state = 'levelup';
  SFX.play('levelup');
  const choices = levelChoices();
  if (!choices.length && R.autoHeal) {
    R.p.hp = Math.min(R.p.maxHp, R.p.hp + R.p.maxHp * 0.3);
    closeLevelUp();
    return;
  }
  $('luTitle').textContent = `レベルアップ！ Lv.${R.p.lv - R.pending + 1}`;
  renderChoices(choices);
  $('levelup').classList.add('show');
}

function renderChoices(choices) {
  const box = $('luCards');
  box.innerHTML = '';
  if (!choices.length) {
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = '<div class="t">栄養補給</div><div class="d">選べるスキルがない。HPを30%回復する。</div>';
    c.onclick = () => { R.autoHeal = true; R.p.hp = Math.min(R.p.maxHp, R.p.hp + R.p.maxHp * 0.3); closeLevelUp(); };
    box.appendChild(c);
  }
  choices.forEach(id => {
    const d = SK[id], cur = R.p.skills[id] || 0;
    const c = document.createElement('div');
    c.className = 'card';
    const eff = d.種別 === 'passive' ? d.効果文 : '威力+30% / 冷却短縮' + (cur % 2 === 1 ? ' / 数+' + (d.countStep || 1) : '');
    c.innerHTML = `<div class="t"></div><div class="d"></div>`;
    c.firstChild.textContent = cur ? `${d.名前}  Lv.${cur} → Lv.${cur + 1}` : `【新規】${d.名前}`;
    c.lastChild.textContent = cur ? `${d.説明}（${eff}）` : d.説明;
    c.onclick = () => { addSkill(id); recalc(); closeLevelUp(); };
    if (R.blocks > 0) {
      const bb = document.createElement('button');
      bb.textContent = `ブロック（残り ${R.blocks}）`;
      bb.onclick = ev => { ev.stopPropagation(); R.blocks--; R.blocked.add(id); renderChoices(levelChoices()); };
      c.appendChild(bb);
    }
    box.appendChild(c);
  });
  const rb = $('rerollBtn');
  rb.textContent = `リロール（残り ${R.rerolls} 回）`;
  rb.disabled = R.rerolls <= 0;
  const sb = $('skipBtn');
  sb.textContent = `スキップ（残り ${R.skips} 回）`;
  sb.disabled = R.skips <= 0;
}

function closeLevelUp() {
  R.pending--;
  if (R.pending > 0) { showLevelUp(); return; }
  $('levelup').classList.remove('show');
  G.state = 'play';
}

$('rerollBtn').onclick = () => {
  if (G.state !== 'levelup' || R.rerolls <= 0) return;
  R.rerolls--;
  renderChoices(levelChoices());
};

$('skipBtn').onclick = () => {
  if (G.state !== 'levelup' || R.skips <= 0) return;
  R.skips--; R.bonusPts += 10;
  R.p.hp = Math.min(R.p.maxHp, R.p.hp + R.p.maxHp * 0.15);
  closeLevelUp();
};

// ---------- 終了 ----------
function win() {
  if (R.over) return;
  R.over = true; R.won = true; SFX.bgm(null); SFX.play('win');
  setTimeout(endRun, 600);
}
function lose() { if (R.over) return; R.over = true; SFX.bgm(null); SFX.play('lose'); endRun(); }

function endRun() {
  G.state = 'over';
  $('levelup').classList.remove('show');
  const base = R.kills + Math.floor(R.t / 10) * 5 + (R.won ? 300 : 0) + R.bonusPts + R.bossKills * 50 * Meta.data.bossBonus;
  const pts = Math.round(base * (1 + 0.1 * Meta.data.pointMul));
  Meta.data.points += pts;
  let extra = '';
  if (R.won) {
    Meta.data.clears++;
    if (!Meta.data.choices4) { Meta.data.choices4 = true; extra = '<p style="color:#fd4">クリア報酬：レベルアップ選択肢が4枠に拡張された！</p>'; }
  }
  Meta.save();
  $('resultPanel').innerHTML = `<h2>${R.won ? 'ステージクリア！' : '力尽きた…'}</h2>
    <p>生存時間 ${fmtTime(R.t)} ／ 撃破数 ${R.kills} ／ レベル ${R.p.lv}</p>
    <p>獲得 処理ポイント：${pts}（所持 ${Meta.data.points}）</p>${extra}
    <button id="toMenu">メニューへ戻る</button>`;
  $('result').classList.add('show');
  $('toMenu').onclick = () => { $('result').classList.remove('show'); showMenu(); };
}

// ---------- メニュー ----------
function isLocked(c) { return !!c.解放価格 && !Meta.data.unlocked.includes(c.id); }

function dexHtml() {
  const dex = Meta.data.bestiary, pts = dex.length, total = Object.keys(EN).length;
  const names = Object.keys(EN).map(k => dex.includes(k) ? EN[k].名前 : '？？？').join(' ／ ');
  const evo = pts >= 10
    ? GAME_CONFIG.進化.map(ev => `${SK[ev.結果].名前}：${SK[ev.基本].名前}をMaxレベルに＋${SK[ev.必要].名前}を所持して宝箱を取得`).join('<br>')
    : `図鑑ptが10に達すると進化スキルの条件が見られる（あと ${10 - pts}pt）`;
  return `<h3>敵図鑑 <small>図鑑pt ${pts} ／ 全${total}種</small></h3>
    <div style="font-size:12px;text-align:left;margin-bottom:6px">${names}</div>
    <div style="font-size:13px;text-align:left;border:1px solid #5ab;border-radius:6px;padding:6px"><b>進化スキル条件</b><br>${evo}</div>`;
}

function showMenu() {
  G.state = 'menu';
  SFX.bgm('menu');
  const md = Meta.data;
  const chars = GAME_CONFIG.キャラクター.map(c => {
    const locked = isLocked(c);
    const sprite = `<img src="${makeSpriteCanvas(c.id, 4).toDataURL()}" width="48" height="48" style="image-rendering:pixelated;vertical-align:middle;margin-right:6px${locked ? ';filter:brightness(0)' : ''}">`;
    if (locked) return `<button class="char locked" data-id="${c.id}" ${md.points < c.解放価格 ? 'disabled' : ''}>
      <div class="t">${sprite}${c.名前} <small>（${c.タイプ}）</small> <small>🔒 ${c.解放価格}pt で開放</small></div>
      <div class="d">${c.説明}<br>特性：${c.特性名}<br>HP ${c.HP} ／ 速度 ${c.速度} ／ 初期スキル：${SK[c.初期スキル].名前}</div></button>`;
    return `<button class="char" data-id="${c.id}" ${c.id === G.selChar ? 'style="border-color:#fd4"' : ''}>
      <div class="t">${sprite}${c.名前} <small>（${c.タイプ}）</small></div>
      <div class="d">${c.説明}${c.特性名 ? '<br>特性：' + c.特性名 : ''}<br>HP ${c.HP} ／ 速度 ${c.速度} ／ 初期スキル：${SK[c.初期スキル].名前}</div></button>`;
  }).join('');
  const shop = GAME_CONFIG.ショップ.map(s => {
    const n = md[s.id], maxed = n >= s.最大, cost = s.価格(n);
    return `<button class="shop" data-id="${s.id}" ${maxed || md.points < cost ? 'disabled' : ''}>
      <div class="t">${s.名前} <small>(${n}/${s.最大}) ${maxed ? '最大' : cost + 'pt'}</small></div><div class="d">${s.説明}</div></button>`;
  }).join('');
  $('menuPanel').innerHTML = `<h2>${GAME_CONFIG.タイトル}</h2>
    <p style="font-size:13px">移動：WASD / 矢印キー / 画面タッチドラッグ。スキルは自動攻撃。<br>${GAME_CONFIG.クリア時間分}分間生き延びて最終ボスを倒せ！</p>
    ${dexHtml()}
    <h3>キャラクター選択</h3>${chars}
    <h3>強化ショップ <small>所持 ${md.points}pt ／ クリア ${md.clears}回 ／ 選択肢 ${md.choices4 ? 4 : 3}枠${md.choices4 ? '' : '（初回クリアで解放）'}</small></h3>${shop}
    <button id="startBtn" style="text-align:center;font-weight:bold;background:#1d7a4f">ゲーム開始</button>`;
  $('menu').classList.add('show');
}

$('menuPanel').addEventListener('click', ev => {
  const b = ev.target.closest('button');
  if (!b || b.disabled) return;
  if (b.classList.contains('char')) {
    const c = GAME_CONFIG.キャラクター.find(x => x.id === b.dataset.id);
    if (isLocked(c)) {
      if (Meta.data.points < c.解放価格) return;
      Meta.data.points -= c.解放価格; Meta.data.unlocked.push(c.id); Meta.save();
    }
    G.selChar = c.id; showMenu();
  }
  else if (b.classList.contains('shop')) {
    const s = GAME_CONFIG.ショップ.find(x => x.id === b.dataset.id), md = Meta.data, cost = s.価格(md[s.id]);
    if (md.points >= cost && md[s.id] < s.最大) { md.points -= cost; md[s.id]++; Meta.save(); showMenu(); }
  } else if (b.id === 'startBtn') startGame();
});

function startGame() {
  newRun();
  $('menu').classList.remove('show');
  $('levelup').classList.remove('show');
  $('result').classList.remove('show');
  G.state = 'play';
  SFX.play('start'); SFX.bgm('run');
  popups.forEach(q => { q.t = 0; q.obj.setVisible(false); });
}

// ---------- 入力 ----------
window.addEventListener('keydown', e => { G.keys[e.key.toLowerCase()] = true; });
window.addEventListener('keyup', e => { G.keys[e.key.toLowerCase()] = false; });
window.addEventListener('blur', () => { G.keys = {}; });

window.addEventListener('pointerdown', e => {
  if (G.state !== 'play' || G.joy.active) return;
  const j = G.joy;
  j.active = true; j.id = e.pointerId; j.sx = e.clientX; j.sy = e.clientY; j.dx = 0; j.dy = 0;
  const el = $('joy');
  el.style.left = j.sx + 'px'; el.style.top = j.sy + 'px'; el.style.display = 'block';
  el.firstElementChild.style.transform = 'translate(0,0)';
});
window.addEventListener('pointermove', e => {
  const j = G.joy;
  if (!j.active || e.pointerId !== j.id) return;
  let dx = e.clientX - j.sx, dy = e.clientY - j.sy;
  const d = Math.hypot(dx, dy), max = 55;
  if (d > max) { dx = dx / d * max; dy = dy / d * max; }
  j.dx = dx / max; j.dy = dy / max;
  $('joy').firstElementChild.style.transform = `translate(${dx}px,${dy}px)`;
});
function endPointer(e) {
  const j = G.joy;
  if (!j.active || e.pointerId !== j.id) return;
  j.active = false; j.dx = j.dy = 0; $('joy').style.display = 'none';
}
window.addEventListener('pointerup', endPointer);
window.addEventListener('pointercancel', endPointer);

function moveVector() {
  const k = G.keys;
  let x = (k['d'] || k['arrowright'] ? 1 : 0) - (k['a'] || k['arrowleft'] ? 1 : 0);
  let y = (k['s'] || k['arrowdown'] ? 1 : 0) - (k['w'] || k['arrowup'] ? 1 : 0);
  if (x || y) { const d = Math.hypot(x, y); return { x: x / d, y: y / d }; }
  return { x: G.joy.dx, y: G.joy.dy };
}

// ---------- 描画 ----------
const popups = [];
function popup(x, y, str, color) {
  const sc = G.scene;
  if (!sc) return;
  let q = popups.find(o => o.t <= 0);
  if (!q) {
    if (popups.length >= 30) return;
    q = { obj: sc.add.text(0, 0, '', { fontFamily: 'sans-serif', fontSize: '14px', stroke: '#000', strokeThickness: 3 }).setDepth(5), t: 0, x: 0, y: 0 };
    popups.push(q);
  }
  q.t = 0.6; q.x = x; q.y = y; q.obj.setText(str).setColor(color).setVisible(true);
}

function updateHud(dt) {
  const p = R.p;
  R.hudT -= dt; R.toastT -= dt;
  if (R.hudT > 0) return;
  R.hudT = 0.1;
  $('hpbar').firstElementChild.style.width = Math.max(0, p.hp / p.maxHp * 100) + '%';
  $('xpbar').firstElementChild.style.width = (p.xp / p.xpNext * 100) + '%';
  $('info').textContent = `${fmtTime(R.t)} / ${GAME_CONFIG.クリア時間分}:00　Lv.${p.lv}　HP ${Math.ceil(p.hp)}/${p.maxHp}　撃破 ${R.kills}` + (R.toastT > 0 ? '　◆' + R.toast : '');
  $('skills').textContent = Object.keys(p.skills).map(id => `${SK[id].名前}${SK[id].evo ? '★' : ' Lv.' + p.skills[id]}`).join(' ／ ');
}

class MainScene extends Phaser.Scene {
  create() {
    G.scene = this;
    this.g = this.add.graphics();
    for (const c of GAME_CONFIG.キャラクター) {
      const tex = this.textures.addCanvas('ch_' + c.id, makeSpriteCanvas(c.id, 1));
      tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
    for (const id in GAME_CONFIG.敵) {
      const tex = this.textures.addCanvas('en_' + id, makeSpriteCanvas(id, 1));
      tex.setFilter(Phaser.Textures.FilterMode.NEAREST);
    }
    this.enemyImgs = [];
    this.playerImg = this.add.image(0, 0, 'ch_' + GAME_CONFIG.キャラクター[0].id).setScale(2.5).setVisible(false);
    showMenu();
  }

  update(time, delta) {
    const dt = Math.min(delta / 1000, 0.05);
    const g = this.g, W = this.scale.width, H = this.scale.height;
    g.clear();
    this.playerImg.setVisible(false);
    this.enemyImgUsed = 0;
    if (!R) { this.enemyImgs.forEach(i => i.setVisible(false)); this.drawGrid(g, W, H, 0, 0); return; }

    if (G.state === 'play' && !R.over) this.step(dt);
    else if (R.over && G.state === 'play') G.state = 'over';

    const cx = R.p.x, cy = R.p.y;
    const sx = x => x - cx + W / 2, sy = y => y - cy + H / 2;
    this.drawGrid(g, W, H, cx, cy);
    this.drawWorld(g, W, H, sx, sy);
    for (let i = this.enemyImgUsed; i < this.enemyImgs.length; i++) this.enemyImgs[i].setVisible(false);
    for (const q of popups) {
      if (q.t <= 0) { q.obj.setVisible(false); continue; }
      if (G.state === 'play') { q.t -= dt; q.y -= 30 * dt; }
      q.obj.setPosition(sx(q.x) - 8, sy(q.y));
    }
    updateHud(dt);
  }

  step(dt) {
    const p = R.p, m = moveVector();
    R.t += dt;
    p.x += m.x * R.ch.速度 * p.mods.speed * dt; p.y += m.y * R.ch.速度 * p.mods.speed * dt;
    if (m.x || m.y) p.face = Math.atan2(m.y, m.x);
    p.inv -= dt; R.flash -= dt;
    p.hp = Math.min(p.maxHp, p.hp + p.mods.regen * dt);
    updateSpawns(dt);
    updateSkills(dt);
    updateProjectiles(dt);
    updateEnemies(dt);
    updateOrbs(dt);
  }

  drawGrid(g, W, H, cx, cy) {
    g.fillStyle(0x06202e, 1).fillRect(0, 0, W, H);
    g.lineStyle(1, 0x0c3a52, 0.7);
    const step = 80, ox = -((cx % step) + step) % step, oy = -((cy % step) + step) % step;
    for (let x = ox; x < W; x += step) g.lineBetween(x, 0, x, H);
    for (let y = oy; y < H; y += step) g.lineBetween(0, y, W, y);
  }

  drawWorld(g, W, H, sx, sy) {
    const p = R.p, vis = (x, y, r) => { const X = sx(x), Y = sy(y); return X > -r && X < W + r && Y > -r && Y < H + r; };
    for (const z of R.zones) {
      g.fillStyle(z.color, 0.25).fillCircle(sx(z.x), sy(z.y), z.r);
      g.lineStyle(2, z.color, 0.6).strokeCircle(sx(z.x), sy(z.y), z.r);
    }
    for (const o of R.orbs) if (vis(o.x, o.y, 10)) g.fillStyle(o.v >= 5 ? 0xffe14d : 0x4dffb0, 1).fillCircle(sx(o.x), sy(o.y), o.v >= 5 ? 6 : 4);
    for (const c of R.chests) {
      const X = sx(c.x), Y = sy(c.y);
      g.fillStyle(0x000000, 0.3).fillRect(X - 14, Y + 9, 28, 4);
      g.fillStyle(0x8b5a2b, 1).fillRect(X - 13, Y - 3, 26, 14);
      g.fillStyle(0xa8732f, 1).fillRect(X - 13, Y - 11, 26, 9);
      g.fillStyle(0xc98f45, 1).fillRect(X - 11, Y - 10, 22, 3);
      g.fillStyle(0x5a5a66, 1).fillRect(X - 13, Y - 4, 26, 3);
      g.fillStyle(0x5a5a66, 1).fillRect(X - 9, Y - 11, 3, 22).fillRect(X + 6, Y - 11, 3, 22);
      g.fillStyle(0xffd34d, 1).fillRect(X - 3, Y - 6, 6, 7);
      g.fillStyle(0x3a2200, 1).fillRect(X - 1, Y - 3, 2, 3);
      g.lineStyle(2, 0x3a2200, 1).strokeRect(X - 13, Y - 11, 26, 22);
    }
    for (const e of R.enemies) {
      if (!vis(e.x, e.y, e.r + 4)) continue;
      const img = this.enemyImgs[this.enemyImgUsed] || (this.enemyImgs[this.enemyImgUsed] = this.add.image(0, 0, 'en_bod'));
      this.enemyImgUsed++;
      img.setTexture('en_' + e.key).setPosition(sx(e.x), sy(e.y)).setScale(e.r * 2.4 / 16)
        .setFlipX(R.p.x < e.x).setVisible(true);
      if (e.flash > 0) img.setTintFill(0xffffff); else img.clearTint();
      if (e.def.ボス) {
        g.lineStyle(3, 0xff4444, 1).strokeCircle(sx(e.x), sy(e.y), e.r);
        g.fillStyle(0x330000, 1).fillRect(sx(e.x) - 30, sy(e.y) - e.r - 12, 60, 6);
        g.fillStyle(0xff4444, 1).fillRect(sx(e.x) - 30, sy(e.y) - e.r - 12, 60 * Math.max(0, e.hp / e.maxHp), 6);
      }
    }
    // スキル表示
    for (const id in p.skills) {
      const d = SK[id], s = skillStats(id);
      if (d.種別 === 'aura') {
        const rad = s.area * p.mods.area;
        g.fillStyle(d.color, 0.12).fillCircle(sx(p.x), sy(p.y), rad);
        g.lineStyle(2, d.color, 0.5).strokeCircle(sx(p.x), sy(p.y), rad);
      } else if (d.種別 === 'orbit') {
        const rad = s.area * p.mods.area;
        for (let i = 0; i < s.count; i++) {
          const a = R.orbitAng * d.rot + (i / s.count) * Math.PI * 2;
          g.fillStyle(d.color, 0.9).fillCircle(sx(p.x + Math.cos(a) * rad), sy(p.y + Math.sin(a) * rad), d.r);
        }
      }
    }
    for (const n of R.novas) g.lineStyle(4, n.color, 0.8).strokeCircle(sx(n.x), sy(n.y), n.r);
    for (const b of R.bullets) if (vis(b.x, b.y, b.r + 4)) g.fillStyle(b.color, 1).fillCircle(sx(b.x), sy(b.y), b.r);
    for (const b of R.ebullets) if (vis(b.x, b.y, b.r + 4)) g.fillStyle(0xff3355, 1).fillCircle(sx(b.x), sy(b.y), b.r);
    for (const f of R.fx) g.lineStyle(3, f.color, Math.min(1, f.t / 0.15)).lineBetween(sx(f.x1), sy(f.y1), sx(f.x2), sy(f.y2));
    // プレイヤー
    const blink = p.inv > 0 && Math.floor(p.inv * 20) % 2 === 0;
    if (!blink) {
      const X = sx(p.x), Y = sy(p.y);
      this.playerImg.setTexture('ch_' + R.ch.id).setPosition(X, Y).setFlipX(Math.cos(p.face) > 0).setVisible(true);
    }
    if (R.flash > 0) g.fillStyle(0xff0000, 0.25 * (R.flash / 0.15)).fillRect(0, 0, W, H);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#06202e',
  scale: { mode: Phaser.Scale.RESIZE, width: '100%', height: '100%' },
  scene: MainScene,
});
