import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 いま入れた最新の通信ツールを読み込みます！

// 🌐 1. 【本物のお直し！】右側の本番URLを、Baraさん専用のRailsの住所「kanso-8m4l.onrender.com」に完璧に修正しました！
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';


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
         // 登録が成功した瞬間に会員証をポケットに入れつつ、
        // トップ（/）ではなく、そのまま自動で初期設定画面（/profile-setup）へ突き進ませます！
        localStorage.setItem('token', response.data.token);
        alert('アカウントの作成が完了しました！続けて初期設定を行います。');
        navigate('/profile-setup');
      }
    } catch (err) {
      //  Rails側からエラー理由が届いた場合は、それを親切に画面に表示します
      if (err.response && err.response.data && err.response.data.errors) {
       // 🎯 【ここをお直し完了！】
        // Rails の仕様によって漏れ出てしまう英語のエラーメッセージを結合したあと、
        // もし英語が混ざっていたら、一瞬で日本人が一番読みやすい100点満点の日本語へ置換（翻訳）します！
        let rawError = err.response.data.errors.join('、');
        
        let cleanError = rawError
          .replace(/Password confirmation doesn't match Password/i, 'パスワード（確認用）とパスワードが一致しません。')
          .replace(/Password is too short \(minimum is 6 characters\)/i, 'パスワードは6文字以上で入力してください。')
          .replace(/Password\s*/i, 'パスワード '); // 万が一他のパスワード英語があっても優しく日本語化します！

        setError(cleanError);
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

        {/* 💻 1. お名前の入力エリア（htmlFor, id, name を安全にドッキング！） */}
        <div style={{ marginBottom: '15px' }}>
          {/* 🔒 htmlFor を追加して、下の input の id と結びつけます */}
          <label htmlFor="register-name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>お名前</label>
          {/* 🛡️ 以下の input 内に、ブラウザ規約をクリアする id と name 、そして本番必須の autocomplete を追加しました！ */}
          <input 
            type="text" 
            id="register-name"
            name="name"
            autoComplete="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        {/* 📧 2. メールアドレスの入力エリア（htmlFor, id, name を安全にドッキング！） */}
        <div style={{ marginBottom: '15px' }}>
          {/* 🔒 htmlFor を追加して、下の input の id と結びつけます */}
          <label htmlFor="register-email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>メールアドレス</label>
          {/* 🛡️ 以下の input 内に、ブラウザ規約をクリアする id と name 、精度向上の autocomplete を追加しました！ */}
          <input 
            type="email" 
            id="register-email"
            name="email"
            autoComplete="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        {/* 🔒 3. パスワードの入力エリア（htmlFor, id, name を安全にドッキング！） */}
        <div style={{ marginBottom: '15px' }}>
          {/* 🔒 htmlFor を追加して、下の input の id と結びつけます */}
          <label htmlFor="register-password" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>パスワード</label>
          {/* 🛡️ 以下の input 内に、ブラウザ規約をクリアする id と name 、身元証明の autocomplete を追加しました！ */}
          <input 
            type="password" 
            id="register-password"
            name="password"
            autoComplete="new-password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        {/* 🔒 4. パスワード確認用の入力エリア（htmlFor, id, name を安全にドッキング！） */}
        <div style={{ marginBottom: '20px' }}>
          {/* 🔒 htmlFor を追加して、下の input の id と結びつけます */}
          <label htmlFor="register-password-confirmation" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>パスワード（確認用）</label>
          {/* 🛡️ 以下の input 内に、ブラウザ規約をクリアする id と name 、身元証明の autocomplete を追加しました！ */}
          <input 
            type="password" 
            id="register-password-confirmation"
            name="password_confirmation"
            autoComplete="new-password"
            value={passwordConfirmation} 
            onChange={(e) => setPasswordConfirmation(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>アカウントを作成する</button>
      </form>
    </div>
  );
}
