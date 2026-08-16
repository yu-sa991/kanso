// 🔐 frontend/src/components/ProfileEdit.tsx (初期設定画面の巨大ボタン書式を100%完全同期させた最終確定版です！)
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';

export default function ProfileEdit() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male'); // 'male' または 'female'
  const [activityLevel, setActivityLevel] = useState('low');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

   // 👤 初期登録時のデータを保持する箱
  const [initialHeight, setInitialHeight] = useState('');
  const [initialWeight, setInitialWeight] = useState('');

  // ⚖️ メイン画面で更新している「最新の体重」を保持する箱
  const [latestWeight, setLatestWeight] = useState('');


  // 📥 1. 画面が開いた瞬間に、現在金庫に登録されている数値を全自動でダウンロードして入力欄に灯します！
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`${API_BASE_URL}/api/v1/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (response.data.registered) {
        const p = response.data.profile;
        setHeight(p.height ? p.height.toString() : '');
        setWeight(p.weight ? p.weight.toString() : '');
        setAge(p.age ? p.age.toString() : '');
        setGender(p.gender || 'male');
        setActivityLevel(p.activity_level || 'low');

         // 初回データを記録
        setInitialHeight(p.height ? p.height.toString() : '---');
        setInitialWeight(p.weight ? p.weight.toString() : '---');
      }
    })
    .catch(error => {
      console.error('現在のプロフィールの引き出しに失敗しました', error);
      setError('データの読み込みに失敗しました。');
    });
  }, [navigate]);

  // 🚀 2. 「変更を保存する」ボタンを押した瞬間に、Railsのupdate窓口へ上書き電波を発射します！
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${API_BASE_URL}/api/v1/profile`, 
        {
          profile: {
            height: parseFloat(height),
            weight: parseFloat(weight),
            age: parseInt(age),
            gender: gender,
            activity_level: activityLevel
          }
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('🎉 プロフィールと目標設定を更新しました！');
        alert('🎉 プロフィールと目標設定を新しく更新しました！メイン画面に戻ります。');
        
        // ⏱️ 10秒おもてなしタイマーの心地よさをここでも採用！1.5秒後にメイン部屋へ自動ワープ！
        setTimeout(() => {
          navigate('/home');
          window.location.reload(); // メインの固定ヘッダー数値を全自動で再計算同期させます
        }, 1500);
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('プロフィールの更新に失敗しました。入力内容を確認してください。');
      }
    }
  };

  return (
    <div style={{ padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#fafafa', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '30px', background: 'white', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #edf2f7', textAlign: 'left' }}>
        
        <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '25px', fontWeight: 'bold' }}>
          👤 プロフィール ＆ 目標の編集
        </h2>
        
        <p style={{ fontSize: '13px', color: '#718096', marginBottom: '25px', textAlign: 'center', lineHeight: '1.5' }}>
          数値を書き換えて保存すると、新しい目標カロリーや<br />標準体重が裏舞台で自動で再計算されます！
        </p>

        {error && <p style={{ color: '#e53e3e', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>⚠️ {error}</p>}
        {successMessage && <p style={{ color: '#38a169', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>{successMessage}</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* ① 身長入力欄 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>📏 身長 (cm)</label>
            <input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} required style={{ padding: '14px', fontSize: '16px', border: '2px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontWeight: 'bold', transition: 'all 0.2s' }} />
          </div>

          {/* ② 体重入力欄 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>⚖️ 現在の体重 (kg)</label>
            <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} required style={{ padding: '14px', fontSize: '16px', border: '2px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontWeight: 'bold', transition: 'all 0.2s' }} />
          </div>

          {/* ③ 年齢入力欄 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>🎂 年齢 (歳)</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required style={{ padding: '14px', fontSize: '16px', border: '2px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontWeight: 'bold', transition: 'all 0.2s' }} />
          </div>

          {/* ④ 性別選択 【🎯 ここが初期設定画面と100%同期した巨大2連プッシュボタンエリアです！】 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>👤 性別</label>
            <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
              
              {/* 🙋‍♂️ 男性ボタン */}
              <button
                type="button"
                onClick={() => setGender('male')}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '14px',
                  border: '2px solid',
                  borderColor: gender === 'male' ? '#3182ce' : '#cbd5e1',
                  background: gender === 'male' ? '#ebf8ff' : 'white',
                  color: gender === 'male' ? '#2b6cb0' : '#4a5568',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: gender === 'male' ? '0 4px 12px rgba(49,130,206,0.15)' : 'none'
                }}
              >
                🙋‍♂️ 男性
              </button>

              {/* 🙋‍♀️ 女性ボタン */}
              <button
                type="button"
                onClick={() => setGender('female')}
                style={{
                  flex: 1,
                  padding: '16px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  borderRadius: '14px',
                  border: '2px solid',
                  borderColor: gender === 'female' ? '#e53e3e' : '#cbd5e1',
                  background: gender === 'female' ? '#fff5f5' : 'white',
                  color: gender === 'female' ? '#c53030' : '#4a5568',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: gender === 'female' ? '0 4px 12px rgba(229,62,62,0.15)' : 'none'
                }}
              >
                🙋‍♀️ 女性
              </button>

            </div>
          </div>

          {/* ⑤ 活動レベル選択 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: 'bold', color: '#4a5568' }}>🏃‍♂️ 日常の活動レベル</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} style={{ padding: '14px', fontSize: '16px', border: '2px solid #cbd5e1', borderRadius: '12px', outline: 'none', fontWeight: 'bold', background: 'white', cursor: 'pointer' }}>
              <option value="low">低い（デスクワーク中心・あまり動かない）</option>
              <option value="normal">普通（立ち仕事や軽い運動を定期的に行う）</option>
              <option value="high">高い（活発な運動、またはハードな肉体労働）</option>
            </select>
          </div>

          {/* 💾 保存 ＆ 戻るボタン */}
          <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button type="submit" style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 14px rgba(40,167,69,0.25)', transition: 'background 0.2s' }}>
              👤 変更内容を安全に保存する
            </button>

            <button type="button" onClick={() => navigate('/home')} style={{ width: '100%', padding: '14px', fontSize: '14px', background: 'none', color: '#718096', border: '1px solid #cbd5e1', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}>
              キャンセルして戻る
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
