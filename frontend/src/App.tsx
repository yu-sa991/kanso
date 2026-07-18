import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

// 🏠 トップページ兼マイページの仮コンポーネント（LP画面などがある場所）
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔍 画面が開いた瞬間、引き出し（localStorage）に会員証（トークン）が入っているかチェック！
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // 🧹 【クリーンアップ処理！】引き出しからデジタル会員証を完全に消去します！
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    alert('ログアウトしました！');
    navigate('/login'); // ログイン画面へ自動ジャンプ
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>kanso アプリへようこそ！</h1>
      <p>「まだ大丈夫」を記録して、心に余白を作る場所。</p>

      <div style={{ marginTop: '20px' }}>
        {isLoggedIn ? (
          // 🔓 ログイン中のときだけ、親切に「ログアウトボタン」を表示します！
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ログアウト
          </button>
        ) : (
          // 🔒 未ログインのときは、ログインや新規登録への案内ボタンを表示します！
          <div>
            <Link to="/login" style={{ marginRight: '15px', padding: '10px 20px', background: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>ログイン</Link>
            <Link to="/register" style={{ padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>新規登録</Link>
          </div>
        )}
      </div>
    </div>
  );
}

// 🌐 アプリ全体の通り道を管理する大元の親玉です
export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. トップ画面の通り道 */}
        <Route path="/" element={<Home />} />
        
        {/* 2. 新規登録画面の通り道（/register にアクセスしたら表示！） */}
        <Route path="/register" element={<Register />} />
        
        {/* 3. ログイン画面の通り道（/login にアクセスしたら表示！） */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
