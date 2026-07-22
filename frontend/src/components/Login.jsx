import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 通信ツールを読み込みます！

// 🌟 1. ファイルの上のほうにこの自動切り替えスイッチをコピペします
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://onrender.com';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // 🌐 axios を使って、大文字の Api/V1 窓口へメールアドレスとパスワードを送信します！
      // ⭕ 修正後（URLの頭をスイッチに変えます！）：
      const response = await axios.post(`${API_BASE_URL}/api/v1/login`, {
        email, password
      });

      if (response.status === 200) {
        // 📥 【連動成功！】引き出し（localStorage）にデジタル会員証（トークン）をガチッと保存！
        localStorage.setItem('token', response.data.token);
        alert('ログインしました！');
        navigate('/'); // ログイン状態のトップ画面へ自動ジャンプ
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('メールアドレスまたはパスワードが正しくありません');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>ログイン</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleLogin}>

        {/* 📧 1. メールアドレス入力エリア（htmlFor, id, name, そして本番必須の autoComplete を安全にドッキング！） */}
        <div style={{ marginBottom: '15px' }}>
          {/* 🔒 htmlFor を追加して、下の input の id("login-email") とガチッと結びつけます！ */}
          <label htmlFor="login-email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>メールアドレス</label>
          {/* 🛡️ 以下の input 内に、ブラウザ規約をクリアする id, name 、そして自動入力を助ける username 属性を正確に追加しました！ */}
          <input 
            type="email" 
            id="login-email"
            name="email"
            autoComplete="username"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        {/* 🔒 2. パスワード入力エリア（htmlFor, id, name, そして本番必須の autoComplete を安全にドッキング！） */}
        <div style={{ marginBottom: '20px' }}>
          {/* 🔒 htmlFor を追加して、下の input の id("login-password") とガチッと結びつけます！ */}
          <label htmlFor="login-password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>パスワード</label>
          {/* 🛡️ 以下の input 内に、ブラウザ規約をクリアする id, name 、そして既存のパスワードを証明する current-password 属性を正確に追加しました！ */}
          <input 
            type="password" 
            id="login-password"
            name="password"
            autoComplete="current-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>ログインする</button>
      </form>
    </div>
  );
}
