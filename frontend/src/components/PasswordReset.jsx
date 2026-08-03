// 🔐 frontend/src/components/PasswordReset.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// 🌟 手元と本番のURLを全自動で切り替える、Baraさん無敵のスイッチを設置します！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://onrender.com';

export default function PasswordReset() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState(''); // 🔑 メールから届いた暗号鍵（トークン）を保管する箱
  
  const navigate = useNavigate();
  const location = useLocation();

  // 🕵️‍♂️ 【画面が開いた瞬間の大仕事！】URLの末尾にくっついている暗号鍵を自動で抜き取ります
  useEffect(() => {
    // 例: /password-reset?token=xyz というURLから、"xyz" の部分だけを取り出します
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('パスワード再設定用の「暗号鍵（トークン）」が見つかりません。メールのリンクからもう一度開き直してください。');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    // 🛑 簡易防犯チェック（入力された2つのパスワードが一致しているか）
    if (password !== passwordConfirmation) {
      setError('新しいパスワードと確認用パスワードが一致しません。');
      return;
    }

    try {
      // 🚀 新設したセキュアな窓口（api/v1/password_resets/[トークン]）へ、新しいパスワードを乗せてAxios電波を発射！
      const response = await axios.put(`${API_BASE_URL}/api/v1/password_resets/${token}`, {
        password: password
      });

      if (response.status === 200) {
        setMessage('パスワードの再設定が正常に完了しました！3秒後にログイン画面へ移動します。');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('パスワードの再設定に失敗しました。リンクの有効期限（30分）が切れている可能性があります。');
      }
    }
  };

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#fafafa', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '30px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
        
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', marginBottom: '10px' }}>
          kanso
        </h2>
        <p style={{ fontSize: '15px', color: '#4a5568', fontWeight: 'bold', marginBottom: '25px' }}>
          🔒 新しいパスワードの登録
        </p>

        {message && <p style={{ color: '#28a745', fontWeight: 'bold', backgroundColor: '#e6fffa', padding: '12px', borderRadius: '8px', border: '1px solid #b2f5ea', fontSize: '14px' }}>{message}</p>}
        {error && <p style={{ color: '#dc3545', fontWeight: 'bold', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '8px', border: '1px solid #fed7d7', fontSize: '14px', textAlign: 'left', lineHeight: '1.5' }}>{error}</p>}

        {/* 🔑 トークン（暗号鍵）が無事に読み込めている時だけ、入力フォームを表示する安全設計です */}
        {token && !message && (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>新しいパスワード（6文字以上）</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" placeholder="例: 新しいパスワードを入力" style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '16px' }} />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}>新しいパスワード（確認用）</label>
              <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required minLength="6" placeholder="例: もう一度同じパスワードを入力" style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '16px' }} />
            </div>

            <button type="submit" style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(40,167,69,0.2)' }}>
              ➔ パスワードを更新してログインする
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
