import moji from 'moji';

// 全角英数 → 半角英数
console.log(moji('ＡＢＣ０１２３４').convert('ZE', 'HE').toString());

// 半角英数 → 全角英数
console.log(moji('ABC01234').convert('HE', 'ZE').toString());

// 全角スペース → 全角スペース
console.log(moji('　').convert('ZS', 'HS').toString());

// ひらがな → カタカナ
console.log(moji('あいうえお').convert('HG', 'KK').toString());

// カタカナ → ひらがな
console.log(moji('アイウエオ').convert('KK', 'HG').toString());

// 全角カナ → 半角カナ
console.log(moji('アイウエオ').convert('ZK', 'HK').toString());

// 半角カナ → 全角カナ
console.log(moji('ｱｲｳｴｵ').convert('HK', 'ZK').toString());
