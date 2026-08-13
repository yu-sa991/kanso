// 🔐 frontend/src/components/OnedariCharacter.tsx (おねだりキャラ専用アパート部屋の全文です！)
import React from 'react';

// 💡 外部から「今日の食事データ(mealRecord)」を優しく受け取ります
interface OnedariCharacterProps {
  mealRecord: any;
}

export default function OnedariCharacter({ mealRecord }: OnedariCharacterProps) {
  let charEmoji = '🐹';      // キャラクターの初期の見た目
  let charScale = 1.0;       // キャラクターの体型（大きさ）
  let charBubble = '記録を待ってるよ！お腹すいたなぁ…🥺'; // セリフ（吹き出し）
  let bubbleBg = '#edf2f7';  // 吹き出しの優しい背景色

   // 🎯 今日の食事ステータス（mealRecord?.status）とコンマ0秒で完全連動！
   // 🎯 【ここをお直し大復活！】Baraさんの本物のデータベースの言葉にガチッと合わせます！
  if (mealRecord?.status === 'not_enough') {
    charEmoji = '🐹💦';
    charScale = 0.75; // 🟢 体をきゅっとしぼませて「激ヤセ体型」に変形！
    charBubble = 'うぅ…ちょっと少なすぎて、お腹と背中がくっつきそうだよぉ…でも、まだ大丈夫！🥺';
    bubbleBg = '#e6f4ea'; // kansoパステルグリーン
  } else if (mealRecord?.status === 'normal') {
    charEmoji = '🐹✨';
    charScale = 1.0;  // 🟡 ちょうどいい「最高にかわいいジャスト体型」！
    charBubble = 'わーい！腹八分目、大成功！今の私、一番スッキリしてて最高に綺麗でしょっ！🥰';
    bubbleBg = '#feebc8'; // kansoパステルイエロー
  } else if (mealRecord?.status === 'overeating') {
    charEmoji = '🐹🐷';
    //charScale = 1.4;  // 🔴 物理的に横に膨らませて「ぷくぷく満腹体型」に巨大化！！
    charScale ="1.7,1.2";  // 🔴 物理的に横に膨らませて「ぷくぷく満腹体型」に巨大化！
    charBubble = 'ぶ、ぶくぅ…！ちょっと食べすぎちゃったかも…！お腹のボタンがはじけそうだよぉ〜！っ、でも明日からがんばろ？あ、体重計るの、忘れてない…？おねだり…計ってぇ？⚖️🥺';
    bubbleBg = '#fce8e6'; // kansoパステルレッド
  }

  return (
    <div style={{ margin: '30px auto 10px auto', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      
      {/* 💭 キャラクターのセリフ（上部にフワッと丸みのある吹き出しを配置！） */}
      <div style={{ background: bubbleBg, padding: '12px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', color: '#2d3748', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', border: '1px solid rgba(0,0,0,0.05)', lineHeight: '1.5', transition: 'all 0.3s' }}>
        {charBubble}
      </div>

      {/* 🐹 キャラクター本体（CSSの scale を使うことで、絵文字のまま体型を自由自在にぷっくり膨らませます！） */}
      <div style={{ 
        fontSize: '60px', 
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 動きをぷるるんと跳ねるようにかわいくします！
        transform: `scale(${charScale})`,  // 🎯 10秒で横にデブっと潰れたかわいい体型に大変貌します！
        marginTop: '5px' 
      }}>
        {charEmoji}
      </div>

    </div>
  );
}


{/*画像用意したら
    // 📁 frontend/src/components/OnedariCharacter.tsx (将来の画像切り替え版のイメージです！)
import React from 'react';
// 🍏 3枚のpng画像をあらかじめ公式に読み込んでおきます
import dietHamster from '../assets/hamster-diet.png';
import happyHamster from '../assets/hamster-happy.png';
import fatHamster from '../assets/hamster-fat.png';

export default function OnedariCharacter({ mealRecord }: any) {
  let charImage = happyHamster; // 初期値は普通（ハッピー）
  let charBubble = '記録を待ってるよ！🥺';

  if (mealRecord?.status === 'not_enough') {
    charImage = dietHamster; // 🟢 激ヤセ画像にチェンジ！
    charBubble = 'お腹ペコペコだよぉ…🥺';
  } else if (mealRecord?.status === 'normal') {
    charImage = happyHamster; // 🟡 標準ハッピー画像！
    charBubble = '今の私、最高にスッキリ綺麗でしょっ！🥰';
  } else if (mealRecord?.status === 'overeating') {
    charImage = fatHamster;  // 🔴 激太りぷくぷく画像にチェンジ！！
    charBubble = 'ぶくぅ…！お腹のボタンがはじけそうだよぉ〜！🐷💦';
  }

  return (
    <div style={{ margin: '30px auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ background: '#edf2f7', padding: '12px 18px', borderRadius: '20px', fontWeight: 'bold' }}>
        {charBubble}
      </div>
      {/* 🎯 【絵文字から本物の画像タグへ！】これだけで512マスの最高にかわいいイラストが大出現します！ 
      <img src={charImage} alt="おねだりキャラ" style={{ width: '120px', height: '120px', marginTop: '15px', objectFit: 'contain' }} />
    </div>
  );
}*/}