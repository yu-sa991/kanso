// 📧 frontend/src/components/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 🌟 手元と本番のURLを全自動で切り替える、Baraさん無敵のスイッチです！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-frontend.onrender.com';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // 🚀 Railsの新しい窓口（api/v1/password_resets）へ、入力されたメールアドレスを乗せてAxios電波を発射！
      await axios.post(`${API_BASE_URL}/api/v1/password_resets`, {
        email: email
      });

      // 🛡️ 【最重要セキュリティ：ユーザー列挙の完全遮断】
      // 先生のご指摘の通り、メールアドレスがデータベースに実在しても、しなくても、
      // ハッカーにヒントを与えないために、成功（try）の引き出しのなかで一律で全く同じ大成功メッセージを画面に灯します！
      setMessage('ご入力いただいたメールアドレスが登録されている場合、パスワード再設定用の案内メールを送信しました。');
      
    } catch (err) {
      // 🚷 通信エラーやサーバーダウンなど、本当のインフラ不具合が起きたときだけ予備の警告を出します
      setError('通信に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#fafafa', minHeight: '100vh', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '30px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
        
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745', marginBottom: '10px' }}>
          kanso
        </h2>
        <p style={{ fontSize: '15px', color: '#4a5568', fontWeight: 'bold', marginBottom: '25px' }}>
          📧 パスワードの再設定申請
        </p>

        {message ? (
          <div>
            <p style={{ color: '#28a745', fontWeight: 'bold', backgroundColor: '#e6fffa', padding: '16px', borderRadius: '8px', border: '1px solid #b2f5ea', fontSize: '14px', textAlign: 'left', lineHeight: '1.6' }}>
              {message}
            </p>
            <button onClick={() => navigate('/login')} style={{ marginTop: '20px', width: '100%', padding: '14px', fontSize: '16px', background: '#e2e8f0', color: '#4a5568', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
              ログイン画面に戻る
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '13px', color: '#718096', marginBottom: '20px', lineHeight: '1.5' }}>
              登録しているメールアドレスを入力してください。パスワード再設定用の使い切りURLをお送りします。
            </p>

            {error && <p style={{ color: '#dc3545', fontWeight: 'bold', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '8px', border: '1px solid #fed7d7', fontSize: '14px', marginBottom: '15px' }}>{error}</p>}

             {/* =========================================================================
                🎯 【ここをお直し完了！】
                label に htmlFor="email" を追加。input に id, name, autoComplete を追加しました。
                これにより、ブラウザの「No label associated...」警告は100%完全に消滅します！
               ========================================================================= */}
            <div style={{ marginBottom: '25px' }}>
              <label 
                htmlFor="email" 
                style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px', color: '#4a5568' }}
              >
                メールアドレス
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="example@kanso.com" 
                autoComplete="email"
                style={{ width: '100%', padding: '12px', boxSizing: 'border-box', border: '1px solid #cbd5e0', borderRadius: '8px', fontSize: '16px' }} 
              />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(40,167,69,0.2)', opacity: loading ? 0.7 : 1 }}>
              {loading ? '送信中...' : '➔ 再設定メールを送信する'}
            </button>

            <button type="button" onClick={() => navigate('/login')} style={{ marginTop: '12px', width: '100%', padding: '12px', fontSize: '14px', background: 'transparent', color: '#718096', border: 'none', cursor: 'pointer' }}>
              キャンセルして戻る
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
