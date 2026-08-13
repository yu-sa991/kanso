{/*// 🔐 frontend/src/components/OnedariCharacter.tsx (おねだりキャラ専用アパート部屋の全文です！)
//import React from 'react'; //最新では書かなくいい　

// 💡 外部から「今日の食事データ(mealRecord)」を優しく受け取るための型（発注書）を定義します
interface OnedariCharacterProps {
  mealRecord: any;
}

export default function OnedariCharacter({ mealRecord }: OnedariCharacterProps) {
  let charEmoji = '🐹';      // キャラクターの初期の見た目
  
  // 🎯 【型エラー(TS2322)完全完封のネジ！】
  // 縦の大きさと横の大きさを、最初から2つの数字として別々に管理する大正解の形へアップデートします！
  let charScaleX = 1.0;      // キャラクターの横の体型（大きさ）
  let charScaleY = 1.0;      // キャラクターの縦の体型（大きさ）
  
  let charBubble = '記録を待ってるよ！お腹すいたなぁ…🥺'; // セリフ（吹き出し）
  let bubbleBg = '#edf2f7';  // 吹き出しの優しい背景色

  // 🎯 今日の食事ステータス（mealRecord?.status）とコンマ0秒で完全連動！
  if (mealRecord?.status === 'not_enough') {
    charEmoji = '🐹💦';
    charScaleX = 0.75; // 🟢 体をきゅっとしぼませて「激ヤセ体型」に変形！
    charScaleY = 0.75;
    charBubble = 'うぅ…ちょっと少なすぎて、お腹と背中がくっつきそうだよぉ…でも、まだ大丈夫！🥺';
    bubbleBg = '#e6f4ea'; // kansoパステルグリーン
  } else if (mealRecord?.status === 'normal') {
    charEmoji = '🐹✨';
    charScaleX = 1.0;  // 🟡 ちょうどいい「最高にかわいいジャスト体型」！
    charScaleY = 1.0;
    charBubble = 'わーい！腹八分目、大成功！今の私、一番スッキリしてて最高に綺麗でしょっ！🥰';
    bubbleBg = '#feebc8'; // kansoパステルイエロー
  } else if (mealRecord?.status === 'overeating') {
    charEmoji = '🐹🐷';
    // 🎯 【激太り完全大合格！】
    // 縦は1.2倍、横幅だけを【1.7倍】の「純粋な数字」として別々に格納することで、
    // TypeScriptの型エラーを1ミリも出さずに、お餅のようにデブっと太ったかわいい体型を物理的に100%再現します！
    charScaleX = 1.7; 
    charScaleY = 1.2;
    charBubble = 'ぶ、ぶくぅ…！ちょっと食べすぎちゃったかも…！お腹のボタンがはじけそうだよぉ〜！っ、でも明日からがんばろ？あ、体重計るの、忘れない…？おねだり…計ってぇ？⚖️🥺';
    bubbleBg = '#fce8e6'; // kansoパステルレッド
  }

  return (
    <div style={{ margin: '30px auto 10px auto', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      
      {/* 💭 キャラクターのセリフ 
      <div style={{ background: bubbleBg, padding: '12px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', color: '#2d3748', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', border: '1px solid rgba(0,0,0,0.05)', lineHeight: '1.5', transition: 'all 0.3s' }}>
        {charBubble}
      </div>

      {/* 🐹 キャラクター本体（XとYを個別に指定することで、最高のぷっくり激太りハムスターが画面に大出現します！） 
      <div style={{ 
        fontSize: '60px', 
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 動きをぷるるんと跳ねるようにかわいくします！
        transform: `scale(${charScaleX}, ${charScaleY})`, 
        marginTop: '5px' 
      }}>
        {charEmoji}
      </div>

    </div>
  );
} */}


// 🔐 frontend/src/components/OnedariCharacter.tsx (正真正銘・変幻自在猫ちゃん版の最終確定全文です！)

interface OnedariCharacterProps {
  mealRecord: any;
}

export default function OnedariCharacter({ mealRecord }: OnedariCharacterProps) {
  let charEmoji = '🐱';      // 猫ちゃんの初期の見た目
  let charScaleX = 1.0;      // 猫ちゃんの横の体型（大きさ）
  let charScaleY = 1.0;      // 猫ちゃんの縦の体型（大きさ）
  let charBubble = '記録を待ってるよ！お腹すいたにゃん…🥺'; // セリフ（吹き出し）
  let bubbleBg = '#edf2f7';  // 吹き出しの優しい背景色

  // 🎯 今日の食事ステータス（mealRecord?.status）とコンマ0秒で完全リアルタイム連動！
  if (mealRecord?.status === 'not_enough') {
    charEmoji = '🐱💦'; // 🟢 少なすぎ：お腹をすかせてシュッとしぼんだ細身の猫ちゃんに！
    charScaleX = 0.75; 
    charScaleY = 0.75;
    charBubble = 'うにゃあ…ちょっと少なすぎて、お腹と背中がくくっつきそうだにゃん…でも、まだ大丈夫！🥺';
    bubbleBg = '#e6f4ea'; // kansoパステルグリーン
  } else if (mealRecord?.status === 'normal') {
    charEmoji = '😻✨'; // 🟡 普通：腹八分目で目がハートになった最高にかわいいジャスト体型！
    charScaleX = 1.0;  
    charScaleY = 1.0;
    charBubble = 'にゃーお！腹八分目、大成功！今の私、一番スッキリしてて最高にスタイリッシュでしょっ！🥰';
    bubbleBg = '#feebc8'; // kansoパステルイエロー
  } else if (mealRecord?.status === 'overeating') {
    charEmoji = '😾🐷'; // 🔴 食べすぎ：ぷくーっとふてくされて激太りしたお餅のような猫ちゃんに！
    // 縦は1.2倍、横幅だけを【1.7倍】に強烈に膨張させて、ぷくぷくの「激太り猫ちゃん体型」を物理的に完全再現！
    charScaleX = 1.7; 
    charScaleY = 1.2;
    charBubble = 'ぶ、ぶにゃぁ…！ちょっと食べすぎちゃったにゃん…！お腹のボタンがはじけそうだにゃ〜！っ、でも明日からがんばろ？あ、体重計るの、忘れてない…？おねだり…計ってぇ？⚖️🥺';
    bubbleBg = '#fce8e6'; // kansoパステルレッド
  }

  return (
    <div style={{ margin: '30px auto 10px auto', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      
      {/* 💭 猫ちゃんのセリフ（上部にフワッと丸みのある吹き出しを配置！） */}
      <div style={{ background: bubbleBg, padding: '12px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', color: '#2d3748', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', position: 'relative', border: '1px solid rgba(0,0,0,0.05)', lineHeight: '1.5', transition: 'all 0.3s' }}>
        {charBubble}
      </div>

      {/* 🐱 猫ちゃん本体（XとYの個別数値指定により、本番環境の型エラーを完全完封しつつ極上のぷっくり感を表現！） */}
      <div style={{ 
        fontSize: '60px', 
        transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // 動きをぷるるんと跳ねるようにかわいくします！
        transform: `scale(${charScaleX}, ${charScaleY})`, 
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