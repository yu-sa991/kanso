// ⭕ 修正後：未使用の React を消して、使う道具（useStateら）だけをスマートに読み込みます！
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // 🚀 通信ツールを読み込みます！
import Register from './components/Register';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import RequireAuth from './components/RequireAuth';

// 🌟 1. ファイルの一番上のほうにこの自動切り替えスイッチをコピペします
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';

// 🏠 トップページ兼マイページ（ヘッダー表示を追加！）
function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 🧠 Railsから届く計算数値をしまっておく箱（ステート）を用意します！
  const [targetCalories, setTargetCalories] = useState(null);
  const [standardWeight, setStandardWeight] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ⚖️ 体重入力用の箱（ステート）を用意します！
  const [weightInput, setWeightInput] = useState('');
  const [weightSuccessMessage, setWeightSuccessMessage] = useState('');
  // 🎯 【Baraさん監修！】体重専用のエラーメッセージを入れる箱を新しく用意します！
  const [weightError, setWeightError] = useState('');

  // 📅 【Baraさん完全監修！】本日の日付（〇月〇日）を画面に優しく表示するための箱（ステート）を新しく追加します！
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // 📅 画面を開いた瞬間の本日の日付を「〇月〇日」の親切な形で自動取得します！
    const now = new Date();
    const formattedDate = `${now.getMonth() + 1}月${now.getDate()}日`;
    setDisplayDate(formattedDate);

    if (token) {
      // 🌐 ログイン中の場合、Railsの確認窓口からオマケの計算数値をダウンロードします！
      axios.get(`${API_BASE_URL}/api/v1/profile`, {
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

      // ⚖️ 【Baraさん完全監修の超親切機能！】
      // グラフ・履歴用の一覧窓口（index）から、このユーザーが「一番最後に記録した最新の体重」を1タップで全自動引き出し！
      axios.get(`${API_BASE_URL}/api/v1/weight_records`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        if (response.data && response.data.length > 0) {
          const latestRecord = response.data[response.data.length - 1];
          // 💻 入力欄の中に、前回入力した体重を全自動で最初から表示させておきます！
          setWeightInput(latestRecord.weight.toString());
        } else {
          // 万が一、まだ一回も体重を記録したことがない初回ユーザーの場合は、初期設定の体重を自動で表示します
          axios.get(`${API_BASE_URL}/api/v1/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.data && res.data.weight) {
              setWeightInput(res.data.weight.toString());
            }
          });
        }
      })
      .catch(error => {
        console.error('最新の体重データの引き出しに失敗しました', error);
      });
    }
  }, []);

  // 📥 🟢🟡🔴 【最重要！】巨大ボタンを押したときにRailsへ瞬時にデータを送信する関数
  const handleMealRecord = async (statusValue) => {
    setError('');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().split('T')[0]; // ⭕ 鍵の閉め忘れも完璧に修正されています！

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/meal_records`,
        {
          meal_record: { date: today, status: statusValue }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        alert('今日の食事判定を記録しました！');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setError(err.response.data.errors.join('、'));
      } else {
        setError('記録に失敗しました。1日1件の制限、または通信状態を確認してください。');
      }
    }
  };

  // ⚖️ 「＋1kg / ー1kg」のアシストボタンが押されたときに、現在の入力値を全自動で計算して連動させる関数
  const handleAdjustWeight = (amount) => {
    const currentWeight = parseFloat(weightInput) || 0;
    const newWeight = (currentWeight + amount).toFixed(1);
    setWeightInput(newWeight);
  };

  // ⚖️ 「体重を記録する」ボタンを押したときにRailsの体重用金庫へ電波を飛ばす関数
  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    setWeightError('');
    setWeightSuccessMessage('');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().split('T')[0]; // ⭕ 鍵の閉め忘れも完璧に修正されています！

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/weight_records`,
        {
          weight_record: { date: today, weight: parseFloat(weightInput) }
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.status === 201) {
        setWeightSuccessMessage(response.data.message || '今日の体重を記録しました！');
        alert('今日の体重を記録しました！');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setWeightError(err.response.data.errors.join('、'));
      } else {
        setWeightError('体重の保存に失敗しました。1日1件の制限、または通信状態を確認してください。');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTargetCalories(null);
    setStandardWeight(null);
    alert('ログアウトしました！');
    navigate('/login');
  };
 
    return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* 👑 上部の初期設定データヘッダー */}
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
      <p style={{ color: '#555', marginBottom: '40px' }}>「まだ大丈夫」を記録して、心に余白を作る場所。</p>

      {/* 🚨 食事記録のエラーメッセージ（画面上部） */}
      {error && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{error}</p>}

      {/* 🌟 【食事記録】 3選択巨大ボタン ＆ 目安表示エリア */}
      {isLoggedIn && (
        <div style={{ maxWidth: '600px', margin: '0 auto 20px auto', padding: '20px', borderBottom: '1px solid #eee' }}>
          {/* 📅 【Baraさん完全監修！】タイトル部分に本日の日付が浮かび上がって自動連動します！ */}
          <h2 style={{ fontSize: '20px', marginBottom: '25px', color: '#333' }}>🍴 本日【{displayDate}】の食事はどうだった？（1秒タップ記録）</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('not_enough')} style={{ width: '100%', padding: '20px', fontSize: '22px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40,167,69,0.2)' }}>
                🟢 少なすぎ （まだ大丈夫）
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                ※目安：朝食や昼食を抜いた、忙しくて1食をゼリーだけで済ませたなど
              </span>
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('normal')} style={{ width: '100%', padding: '20px', fontSize: '22px', background: '#ffc107', color: '#212529', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(255,193,7,0.2)' }}>
                🟡 普 通 ・ 腹 八 分 目
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                ※目安：いつもの量、腹八分目で抑えられた、バランス良く食べられたなど
              </span>
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('overeating')} style={{ width: '100%', padding: '20px', fontSize: '22px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220,53,69,0.2)' }}>
                🔴 食 べ す ぎ（やばい）
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '14px', color: '#666', fontWeight: '500' }}>
                ※目安：満腹まで食べた、夜遅くに重い食事をした、間食にお菓子を食べすぎたなど
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 【体重記録】 体重記録・直接入力 ＆ 増減アシストUIエリア */}
      {isLoggedIn && (
        <div style={{ maxWidth: '600px', margin: '30px auto 40px auto', padding: '20px' }}>
          {/* 📅 【Baraさん完全監修！】体重側にも本日の日付が優しく自動表示されます！ */}
          <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>⚖️ 本日【{displayDate}】の現在の体重は？（1タップ微調整記録）</h2>
          
          <form onSubmit={handleWeightSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
              
              {/* ➖ 1kgマイナスアシストボタン */}
              <button type="button" onClick={() => handleAdjustWeight(-1.0)} style={{ padding: '15px 20px', fontSize: '18px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>
                ー 1 kg
              </button>

              {/* ⌨️ 数字専用キーボードフォーム */}
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <input 
                  type="number" 
                  id="today-weight"
                  name="weight"
                  autoComplete="off"
                  step="0.1" 
                  min="1"
                  max="300"
                  value={weightInput} 
                  onChange={(e) => setWeightInput(e.target.value)} 
                  required 
                  style={{ width: '130px', padding: '12px', fontSize: '22px', textAlign: 'center', border: '2px solid #28a745', borderRadius: '8px', fontWeight: 'bold' }} 
                />
                <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '8px', color: '#333' }}>kg</span>
              </div>

              {/* ➕ 1kgプラスアシストボタン */}
              <button type="button" onClick={() => handleAdjustWeight(1.0)} style={{ padding: '15px 20px', fontSize: '18px', background: '#e0e0e0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#333' }}>
                ＋ 1 kg
              </button>
            </div>

            {/* 🚀 主役の体重保存ボタン */}
            <button type="submit" style={{ width: '100%', maxWidth: '400px', padding: '15px', fontSize: '18px', background: '#007bff', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,123,255,0.2)' }}>
              ⚖️ 体重を記録する
            </button>

            {/* 🎯 体重記録のエラー ＆ 成功メッセージをボタンのすぐ真下に配置！ */}
            {weightError && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px', margin: 0 }}>⚠️ {weightError}</p>}
            {weightSuccessMessage && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', margin: 0 }}>🎉 {weightSuccessMessage}</p>}
          </form>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
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
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-setup" element={<ProfileSetup />} />
      </Routes>
    </Router>
  );
}
