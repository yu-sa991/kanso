import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // 🚀 Link を優しく復活させてあげます！
import axios from 'axios'; // 🚀 通信ツールを読み込みます！

// 🌟 1. ファイルの上のほうにこの自動切り替えスイッチをコピペします
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';


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
        // ログイン状態のトップ画面へ自動ジャンプ
        // 🎯 【ここをお直し！】お名前バッジ付きの、新しい本物のメイン記録画面（/home）へ力強く誘導します！
        navigate('/home'); 
      }
   } catch (err) {
      // 🎯 【お直し完了！エラーメッセージの文言も元の形へ完ペキに復元しました】
      // Rails（401）から届くエラーをスキャンし、Baraさんが大切に育ててきた
      // 「メールアドレスまたはパスワードが正しくありません」の親切な日本語を100%正確に画面へリレーします！
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
            autoComplete="email"
            maxLength="100"
            /* 🎯 【お直し完了！】ハッカーの嫌がらせ超長文アドレスをタイピングの段階で100%完全に完封します！ */
            onInput={(e) => { if (e.target.value.length > 100) e.target.value = e.target.value.slice(0, 100); }}
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
            maxLength="30"
            /* 🎯 【お直し完了！】30文字を超えるパスワードの入力をその場で完全にフリーズさせます！ */
            onInput={(e) => { if (e.target.value.length > 30) e.target.value = e.target.value.slice(0, 30); }}
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #999', borderRadius: '4px', fontSize: '16px' }} 
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>ログインする</button>
      </form>

      {/* 👤 📧 【ここをお直し！】ジャンプ先の住所を、新しく作ったメールアドレス入力画面（/forgot-password）へと切り替えました！ */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link to="/forgot-password" style={{ color: '#718096', textDecoration: 'underline', fontSize: '14px', fontWeight: '500' }}>
          🔑 パスワードを忘れた方はこちら
        </Link>

     </div> 
    </div>
  );
}
