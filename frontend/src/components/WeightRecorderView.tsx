// 🔐 frontend/src/components/WeightRecorderView.tsx (体重入力エリア専用ファイルの全文です！)
import React from 'react';

// 💡 App.tsx側から、体重の入力値や保存関数、日付データを優しく受け取るための発注書（型定義）です
interface WeightRecorderViewProps {
  displayDate: string;
  weightInput: string;
  setWeightInput: (value: string) => void;
  handleWeightSubmit: (e: React.FormEvent) => void;
  handleAdjustWeight: (amount: number) => void;
  weightError: string;
  weightSuccessMessage: string;
  weightSectionRef: React.RefObject<HTMLDivElement>;
}

export default function WeightRecorderView({
  displayDate,
  weightInput,
  setWeightInput,
  handleWeightSubmit,
  handleAdjustWeight,
  weightError,
  weightSuccessMessage,
  weightSectionRef
}: WeightRecorderViewProps) {
  return (
    <div ref={weightSectionRef} style={{ maxWidth: '600px', margin: '0 auto 40px auto', padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#2d3748', fontWeight: 'bold' }}>
        ⚖️ 本日【{displayDate}】の現在の体重は？
      </h2>
      
      <form onSubmit={handleWeightSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
          <button type="button" onClick={() => handleAdjustWeight(-1.0)} style={{ padding: '12px 18px', fontSize: '16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' }}>
            ー 1 kg
          </button>

          {/* 🎯 TypeScript型チェック完全大合格仕様！5桁上限フリーズロックも完璧に内蔵しています */}
          <div style={{ textAlign: 'left', position: 'relative' }}>
            <input 
              type="number" 
              id="today-weight"
              name="weight"
              autoComplete="off"
              step="0.1" 
              min="1"
              max="300"
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.value.length > 5) {
                  target.value = target.value.slice(0, 5);
                }
              }}
              value={weightInput} 
              onChange={(e) => setWeightInput(e.target.value)} 
              required 
              style={{ width: '120px', padding: '12px', fontSize: '22px', textAlign: 'center', border: '2px solid #28a745', borderRadius: '8px', fontWeight: 'bold', outline: 'none' }} 
            />
            <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '8px', color: '#333' }}>kg</span>
          </div>

          <button type="button" onClick={() => handleAdjustWeight(1.0)} style={{ padding: '12px 18px', fontSize: '16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' }}>
            ＋ 1 kg
          </button>
        </div>

        <button type="submit" style={{ width: '100%', maxWidth: '400px', padding: '15px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(40,167,69,0.2)' }}>
          ⚖️ 体重を記録する
        </button>

        {weightError && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px', margin: 0 }}>⚠️ {weightError}</p>}
        {weightSuccessMessage && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', margin: 0 }}>🎉 {weightSuccessMessage}</p>}
      </form>
    </div>
  );
}
