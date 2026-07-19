import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup'; // 🚀 身体設定画面を読み込み！
import RequireAuth from './components/RequireAuth'; // 🚀 誘導ロボットを読み込み！

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('ログアウトしました！');
    navigate('/login');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
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
        {/*  トップ画面（/）を誘導ロボット <RequireAuth> でガチッと囲みます！ */}
        {/* これにより、未登録の初回ユーザーがトップに来た瞬間、自動で /profile-setup へビューンとリダイレクトされます！ */}
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* 🆕 4. プロフィール入力画面の通り道を開通！ */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
}
