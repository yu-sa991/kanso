// ⭕ 修正後：未使用の React を消して、使う道具（useStateら）だけをスマートに読み込みます！
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 通信ツールを読み込みます！
import Register from './components/Register';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import RequireAuth from './components/RequireAuth';

// 🌟 1. ファイルの一番上のほうにこの自動切り替えスイッチをコピペします
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://onrender.com';

// 🏠 トップページ兼マイページのコンポーネント（ヘッダー表示を追加！）
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 🧠 Railsから届く計算数値をしまっておく箱（ステート）を用意します！
  const [targetCalories, setTargetCalories] = useState(null);
  const [standardWeight, setStandardWeight] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      // 🌐 ログイン中の場合、Railsの確認窓口からオマケの計算数値をダウンロードします！
      // ⭕ 修正後（URLの頭をスイッチに変えます！）：
      axios.get(`${API_BASE_URL}/api/v1/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.data.registered) {
          // 📥 Rails側で自動計算された数値を、Reactの箱へガチッと格納！
          setTargetCalories(response.data.target_calories);
          setStandardWeight(response.data.standard_weight);
        }
      })
      .catch(error => {
        console.error('データの取得に失敗しました', error);
      });
    }
  }, []);


  // 📥 🟢🟡🔴 【最重要！】巨大ボタンを押したときにRailsへ瞬時にデータを送信する関数
  const handleMealRecord = async (statusValue) => {
    setError('');
    const token = localStorage.getItem('token');
    
    // 📅 今日配置する日付を「YYYY-MM-DD」の形式で正確に取得します
    const today = new Date().toISOString().split('T')[0];

    try {
      // 🌐 前回のイシューで作ったばかりの、カレンダー食事記録保存窓口へ電波を飛ばします！
      const response = await axios.post(
        'http://localhost:3000/api/v1/meal_records',
        {
          meal_record: { date: today, status: statusValue }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        alert('今日の食事判定を記録しました！');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('記録に失敗しました。1日1件の制限、または通信状態を確認してください。');
      }
    }
  };

   const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTargetCalories(null);
    setStandardWeight(null);
    alert('ログアウトしました！');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* 👑 上部の初期設定データヘッダー */}
      {isLoggedIn && targetCalories && (
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e9ecef', display: 'inline-block', minWidth: '350px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>🎯 あなたの現在の初期設定データ</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', gap: '20px' }}>
            <div>
              <span style={{ fontSize: '14px', color: '#666', display: 'block' }}>目標摂取カロリー</span>
              <strong style={{ fontSize: '20px', color: '#ffc107' }}>{targetCalories} <span style={{ fontSize: '14px', color: '#333' }}>kcal / 日</span></strong>
            </div>
            <div style={{ borderLeft: '1px solid #dee2e6' }}></div>
            <div>
              <span style={{ fontSize: '14px', color: '#666', display: 'block' }}>BMI 22 標準体重</span>
              <strong style={{ fontSize: '20px', color: '#28a745' }}>{standardWeight} <span style={{ fontSize: '14px', color: '#333' }}>kg</span></strong>
            </div>
          </div>
        </div>
      )}

      <h1>kanso アプリへようこそ！</h1>
      <p style={{ color: '#555', marginBottom: '40px' }}>「まだ大丈夫」を記録して、心に余白を作る場所。</p>

      {/* 🚨 二重登録や通信のエラーメッセージ表示 */}
      {error && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{error}</p>}

      {/* 🌟 【 1秒・3択巨大ボタン ＆ 客観的一言目安表示エリア */}
      {isLoggedIn && (
        <div style={{ maxWidth: '600px', margin: '0 auto 40px auto', padding: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '25px', color: '#333' }}>🍴 今日の食事はどうだった？（1秒タップ記録）</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
            
            {/* 🟢 ボタン1：少なすぎ（not_enough）を「緑色」で親切に表示！ */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('not_enough')} style={{ width: '100%', padding: '20px', fontSize: '22px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40,167,69,0.2)', transition: 'transform 0.1s' }}>
                🟢 少なすぎ （まだ大丈夫）
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                ※目安：朝食や昼食を抜いた、忙しくて1食をゼリーだけで済ませたなど
              </span>
            </div>

            {/* 🟡 ボタン2：普通（normal）を「黄色」で優しく表示！ */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('normal')} style={{ width: '100%', padding: '20px', fontSize: '22px', background: '#ffc107', color: '#212529', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(255,193,7,0.2)', transition: 'transform 0.1s' }}>
                🟡 普 通 ・ 腹 八 分 目
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                ※目安：いつもの量、腹八分目で抑えられた、バランス良く食べられたなど
              </span>
            </div>

            {/* 🔴 ボタン3：食べすぎ（overeating）を「赤色」で直感的に警告！ */}
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('overeating')} style={{ width: '100%', padding: '20px', fontSize: '22px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220,53,69,0.2)', transition: 'transform 0.1s' }}>
                🔴 食 べ す ぎ（やばい）
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                ※目安：満腹まで食べた、夜遅くに重い食事をした、間食にお菓子を食べすぎたなど
              </span>
            </div>

          </div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ログアウト
          </button>
        ) : (
          <div>
            <Link to="/login" style={{ marginRight: '15px', padding: '10px 20px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>ログイン</Link>
            <Link to="/register" style={{ padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>新規登録</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
}
