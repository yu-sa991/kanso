// 🔐 frontend/src/components/MealRecorderView.tsx (縦並びの美しさと目安の読みやすさを両立した、正真正銘の最終確定版です！)
import React from 'react';

interface MealRecorderViewProps {
  displayDate: string;
  mealRecord: any;
  mealSuccess: boolean;
  handleMealRecord: (statusValue: string) => void;
  mealSectionRef: React.RefObject<HTMLDivElement>;
}

export default function MealRecorderView({
  displayDate,
  mealRecord,
  mealSuccess,
  handleMealRecord,
  mealSectionRef
}: MealRecorderViewProps) {
  return (
    <div ref={mealSectionRef} style={{ maxWidth: '600px', margin: '0 auto 30px auto', padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '25px', color: '#2d3748', fontWeight: 'bold' }}>
        📅 本日【{displayDate}】の食事はどうだった？
      </h2>
      
      {/* 🎯 flexDirection を column（縦並び）に綺麗に戻し、片手での押しやすさを極限まで高めます！ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        
        {/* 🟢 ① 少なすぎボタン部屋 */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* 🎯 【ここをお直し！】'light' ➔ 'not_enough' にカチッと書き換えます！ */}
          <button onClick={() => handleMealRecord('not_enough')} style={{ width: '100%', padding: '18px', fontSize: '20px', background: mealRecord?.status === 'not_enough' ? '#c6f6d5' : '#28a745', color: mealRecord?.status === 'not_enough' ? '#22543d' : 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40,167,69,0.15)' }}>
            🟢 少なすぎ （まだ大丈夫）
          </button>
          <span style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#718096', textAlign: 'center' }}>
            ※目安：朝食や昼食を抜いた、忙しくて1食をゼリーだけで済ませたなど
          </span>
        </div>

        {/* 🟡 ② 普通ボタン部屋 */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <button onClick={() => handleMealRecord('normal')} style={{ width: '100%', padding: '20px', fontSize: '20px', background: mealRecord?.status === 'normal' ? '#feebc8' : '#ffc107', color: '#212529', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(255,193,7,0.15)' }}>
            🟡 普 通 ・ 腹 八 分 目
          </button>
          <span style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#718096', textAlign: 'center' }}>
            ※目安：いつもの量、腹八分目で抑えられた、バランス良く食べられたなど
          </span>
        </div>

        {/* 🔴 ③ 食べすぎボタン部屋 */}
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* 🎯 【ここをお直し！】'heavy' ➔ 'overeating' にカチッと書き換えます！ */}
          <button onClick={() => handleMealRecord('overeating')} style={{ width: '100%', padding: '20px', fontSize: '20px', background: mealRecord?.status === 'overeating' ? '#fed7d7' : '#dc3545', color: mealRecord?.status === 'overeating' ? '#742a2a' : 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220,53,69,0.15)' }}>
            🔴 食 べ す ぎ（やばい）
          </button>
          <span style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#718096', textAlign: 'center' }}>
            ※目安：満腹まで食べた、夜遅くに重い食事をした、間食にお菓子を食べすぎたなど
          </span>
        </div>

      </div>

      {/* 🎯 食事の成功お祝いメッセージ（縦の美しい並びの真下に灯します！） */}
      {mealSuccess && (
        <p style={{ color: '#28a745', fontWeight: 'bold', textAlign: 'center', marginTop: '20px', margin: 0 }}>
          🎉 今日の食事を記録しました！
        </p>
      )}

    </div>
  );
}







{/*// 🔐 frontend/src/components/MealRecorderView.tsx (目安テキストが横並びで綺麗に収まった最終確定版です！)
import React from 'react';

interface MealRecorderViewProps {
  displayDate: string;
  mealRecord: any;
  mealSuccess: boolean;
  handleMealRecord: (statusValue: string) => void;
  mealSectionRef: React.RefObject<HTMLDivElement>;
}

export default function MealRecorderView({
  displayDate,
  mealRecord,
  mealSuccess,
  handleMealRecord,
  mealSectionRef
}: MealRecorderViewProps) {
  return (
    <div ref={mealSectionRef} style={{ maxWidth: '600px', margin: '0 auto 25px auto', padding: '20px 15px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
      <h2 style={{ fontSize: '16px', marginBottom: '18px', color: '#2d3748', fontWeight: 'bold' }}>
        📅 本日【{displayDate}】の食事はどうだった？
      </h2>
      
      {/* 🎯 横一列に並びつつ、ボタンと目安テキストを上下のペアにして綺麗に整列させます！ 
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center', width: '100%', alignItems: 'flex-start' }}>
        
        {/* 🟢 ① 少なすぎの部屋 
        <div style={{ flex: 1, maxWidth: '150px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          <button onClick={() => handleMealRecord('light')} style={{ width: '100%', padding: '15px 5px', fontSize: '13px', background: mealRecord?.status === 'light' ? '#c6f6d5' : '#28a745', color: mealRecord?.status === 'light' ? '#22543d' : 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40,167,69,0.12)' }}>
            🟢 少なすぎ
          </button>
          {/* 🎯 【少なすぎの目安】 
          <span style={{ fontSize: '10.5px', color: '#718096', lineHeight: '1.4', textAlign: 'center', display: 'block', wordBreak: 'break-all' }}>
            朝昼を抜いた<br />ゼリーだけ等
          </span>
        </div>

        {/* 🟡 ② 普通の部屋 
        <div style={{ flex: 1, maxWidth: '150px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          <button onClick={() => handleMealRecord('normal')} style={{ width: '100%', padding: '15px 5px', fontSize: '13px', background: mealRecord?.status === 'normal' ? '#feebc8' : '#ffc107', color: '#212529', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(255,193,7,0.12)' }}>
            🟡 普 通
          </button>
          {/* 🎯 【普通の目安】 
          <span style={{ fontSize: '10.5px', color: '#718096', lineHeight: '1.4', textAlign: 'center', display: 'block', wordBreak: 'break-all' }}>
            いつもの量<br />腹八分目など
          </span>
        </div>

        {/* 🔴 ③ 食べすぎの部屋 
        <div style={{ flex: 1, maxWidth: '150px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          <button onClick={() => handleMealRecord('heavy')} style={{ width: '100%', padding: '15px 5px', fontSize: '13px', background: mealRecord?.status === 'heavy' ? '#fed7d7' : '#dc3545', color: mealRecord?.status === 'heavy' ? '#742a2a' : 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220,53,69,0.12)' }}>
            🔴 食べすぎ(ヤバい)
          </button>
          {/* 🎯 【食べすぎ（やばい）の目安】 
          <span style={{ fontSize: '10.5px', color: '#718096', lineHeight: '1.4', textAlign: 'center', display: 'block', wordBreak: 'break-all' }}>
            満腹まで食べた<br />夜遅い夜食、お菓子等
          </span>
        </div>

      </div>

      {/* 🎯 食事の成功お祝いメッセージ 
      {mealSuccess && (
        <p style={{ color: '#28a745', fontWeight: 'bold', textAlign: 'center', marginTop: '20px', margin: 0, fontSize: '14px' }}>
          🎉 今日の食事を記録しました！
        </p>
      )}

    </div>
  );
}*/}



