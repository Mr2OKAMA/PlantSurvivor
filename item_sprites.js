// ドロップアイテムのドット絵（12x12）。'.'は透明。
const ITEM_SPRITES = {
  // 若葉の雫：最大HPの20%回復
  heal: {
    パレット: { o: '#1d6b2f', g: '#6be07a', l: '#d8ffd8', r: '#e8433f' },
    絵: [
      '....oooo....',
      '...orrrro...',
      '...orllro...',
      '.ooorrrrooo.',
      'orrrrrrrrrro',
      'orrllrrrrrro',
      'orrrrrrrrrro',
      '.ooorrrrooo.',
      '...orrrro...',
      '...orrrro...',
      '....oooo....',
      '............',
    ],
  },
  // 磁石花：全ての経験値・アイテムを引き寄せる
  magnet: {
    パレット: { o: '#222233', r: '#e8433f', b: '#4d7dff', w: '#f4f4f4' },
    絵: [
      '............',
      '..oooooooo..',
      '.orrrrbbbbo.',
      '.orrrrbbbbo.',
      '.orrooooobo.',
      '.orro..oboo.',
      '.orro..obo..',
      '.orro..obo..',
      '.owwo..owwo.',
      '.owwo..owwo.',
      '..oo....oo..',
      '............',
    ],
  },
  // 金の根：10秒間無敵
  star: {
    パレット: { o: '#8a5a00', y: '#ffd93d', l: '#fff6b0' },
    絵: [
      '.....oo.....',
      '.....oo.....',
      '....oyyo....',
      '....oyyo....',
      'oooooyloooo.',
      'oyyyyylyyyyo',
      '.oyyyyyyyyo.',
      '..oyyyyyyo..',
      '..oyyyyyyo..',
      '.oyyyooyyyo.',
      '.oyyo..oyyo.',
      '..oo....oo..',
    ],
  },
};
