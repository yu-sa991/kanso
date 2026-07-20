import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 通信ツールを読み込みます！
import Register from './components/Register';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import RequireAuth from './components/RequireAuth';

// 🏠 トップページ兼マイページのコンポーネント（ヘッダー表示を追加！）
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 🧠 Railsから届く計算数値をしまっておく箱（ステート）を用意します！
  const [targetCalories, setTargetCalories] = useState(null);
  const [standardWeight, setStandardWeight] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    if (token) {
      // 🌐 ログイン中の場合、Railsの確認窓口からオマケの計算数値をダウンロードします！
      axios.get('http://localhost:3000/api/v1/profile', {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTargetCalories(null);
    setStandardWeight(null);
    alert('ログアウトしました！');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {/* 👑 【新設！】画面上部のスタイリッシュなヘッダー表示エリア */}
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
      <p>「まだ大丈夫」を記録して、心に余白を作る場所。</p>

      <div style={{ marginTop: '20px' }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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

