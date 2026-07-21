import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 いま入れた最新の通信ツールを読み込みます！

// 🌟 1. ファイルの上のほうにこの自動切り替えスイッチをコピペします
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://onrender.com';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      //  axios を使って、大文字の Api/V1 窓口へお名前とパスワードを送信します！
      // ❌ 修正前： const response = await axios.post('http://localhost:3000/api/v1/register', {
      // ⭕ 修正後（URLの頭をスイッチの名前に変えます！）：
  const response = await axios.post(`${API_BASE_URL}/api/v1/register`, {
        user: { name, email, password, password_confirmation: passwordConfirmation }
      });

      if (response.status === 201) {
        //  【連動成功！】Railsから届いた会員証（JWT）をブラウザの引き出し（localStorage）へ保存！
        localStorage.setItem('token', response.data.token);
        alert('アカウントの作成が完了しました！');
        navigate('/'); // ログイン状態のトップ画面へ自動ジャンプ
      }
    } catch (err) {
      //  Rails側からエラー理由が届いた場合は、それを親切に画面に表示します
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('サーバーとの通信に失敗しました。パスワード一致や未登録アドレスか確認してください。');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>ユーザー新規登録</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>お名前</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>メールアドレス</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>パスワード</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>パスワード（確認用）</label>
          <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>アカウントを作成する</button>
      </form>
    </div>
  );
}
