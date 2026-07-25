import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// 🌟 1. 手元・本番自動切り替えスイッチをここにもドッキングします
const API_BASE_URL = import.meta.env.DEV ? 'https://kanso-8m4l.onrender.com';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setWeightSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError('');
    setWeightSuccessMessage('');

    try {
      // 🌐 さっき Rails 側に作ったばかりの、未ログイン用パスワード再設定窓口へ電波を飛ばします！
      const response = await axios.post(`${API_BASE_URL}/api/v1/password_resets`, {
        password_reset: { email, password, password_confirmation: passwordConfirmation }
      });

      if (response.status === 200) {
        setWeightSuccessMessage(response.data.message || 'パスワードが安全に再設定されました！');
        alert('パスワードの再設定が完了しました！新しいパスワードでログインしてください。');
        navigate('/login'); // 🔑 成功したら、お祝いのログイン画面へ自動ジャンプ！
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('パスワードの再設定に失敗しました。入力内容や通信状態を確認してください。');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>鍵の紛失・パスワード再設定</h2>
      <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginBottom: '20px' }}>
        ご登録済みのメールアドレスを入力し、新しいパスワードを決めてください。
      </p>

      {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>⚠️ {error}</p>}
      {successMessage && <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>🎉 {successMessage}</p>}

      <form onSubmit={handlePasswordReset}>
        {/* 📧 1. メールアドレス入力欄（ブラウザがユーザーを特定しやすくなる username 属性を完備！） */}
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="reset-email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>ご登録のメールアドレス</label>
          <input 
            type="email" 
            id="reset-email"
            name="email"
            autoComplete="username"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        {/* 🔒 2. 新しいパスワード入力欄（最重要：最新ブラウザの最強防犯属性 new-password バッジを付与！） */}
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="reset-password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>新しいパスワード（6文字以上）</label>
          <input 
            type="password" 
            id="reset-password"
            name="password"
            autoComplete="new-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        {/* 🔒 3. 新しいパスワード確認入力欄（こちらも完璧に同じ new-password バッジで防衛します！） */}
        <div style={{ marginBottom: '25px', textAlign: 'left' }}>
          <label htmlFor="reset-password-confirmation" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>新しいパスワード（確認用）</label>
          <input 
            type="password" 
            id="reset-password-confirmation"
            name="password_confirmation"
            autoComplete="new-password"
            value={passwordConfirmation} 
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,123,255,0.15)' }}>
          🔒 パスワードを新しく更新する
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/login" style={{ color: '#28a745', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
          ➔ ログイン画面に戻る
        </Link>
      </div>
    </div>
  );
}
