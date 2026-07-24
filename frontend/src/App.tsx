// ⭕ 修正後：未使用の React を消して、使う道具（useStateら）だけをスマートに読み込みます！
import { useState, useEffect, useRef } from 'react'; // 🚀 画面内の位置を指さすための「useRef」を新しく読み込みます！
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

  // 📅 【Baraさん完全監修！】本日の日付（〇月〇日）を画面に優しく表示するための箱（ステート）
  const [displayDate, setDisplayDate] = useState('');

  // 🎯 【今回の主役：画面移動させないためのアンカーリンク設定！】
  // 画面内の「食事記録エリア」と「体重記録エリア」の場所を、システムに正確に指さして教えるためのピン（Ref）を用意します！
  const mealSectionRef = useRef(null);
  const weightSectionRef = useRef(null);

  // 🟢 フッターメニューのどのボタンがピカッと点灯（アクティブ）しているかを管理する箱
  const [activeMenu, setActiveMenu] = useState('meal');

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

  // 📥 🟢🟡🔴 巨大ボタンを押したときにRailsへ瞬時にデータを送信する関数
  const handleMealRecord = async (statusValue) => {
    setError('');
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().split('T')[0]; // ⭕ 完璧なお直しバージョン！

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
    const today = new Date().toISOString().split('T')[0]; // ⭕ 完璧なお直しバージョン！

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

  // 📱 【Baraさん完全監修！】フッターメニューを押したときに、画面移動せずエレベーターのように滑らかに案内する関数
  const scrollToSection = (sectionRef, menuName) => {
    setActiveMenu(menuName); // 押しボタンの緑色をピカッと切り替える

    if (sectionRef && sectionRef.current) {
      // 🚀 ヘッダーの固定分（少し上）を考慮して、ターゲットの場所まで優しくスルルーッと自動スクロール！
      const yOffset = -110; 
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' }); // smooth を指定することで極上の滑らかさに！
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
    // 📱 外側の枠組み：フッターが最下部に固定されるため、お尻にゆとり（paddingBottom）を持たせます
    <div style={{ padding: '90px 20px 100px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#fafafa', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* 👑 👑 👑 【上部固定ヘッダーエリア：position: fixed で画面上にガチッと固定！】 */}
      {isLoggedIn && targetCalories && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 15px', zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#4a5568' }}>🎯 現在の目標設定</span>
            <div style={{ display: 'flex', gap: '15px', fontSize: '14px' }}>
              <span style={{ background: '#fffaf0', padding: '4px 10px', borderRadius: '20px', border: '1px solid #feebc8', color: '#dd6b20', fontWeight: 'bold' }}>
                🔥 {targetCalories} kcal
              </span>
              <span style={{ background: '#f0fff4', padding: '4px 10px', borderRadius: '20px', border: '1px solid #c6f6d5', color: '#38a169', fontWeight: 'bold' }}>
                ⚖️ 標準 {standardWeight} kg
              </span>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1>kanso アプリへようこそ！</h1>
        <p style={{ color: '#555', marginBottom: '30px' }}>「まだ大丈夫」を記録して、心に余白を作る場所。</p>

        {/* 🚨 エラー ＆ 成功メッセージ表示 */}
        {error && <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>{error}</p>}
      </div>

      {/* 🌟 🌟 🌟 【食事記録エリア：ref でシステムに場所を教えます！】 */}
      {isLoggedIn && (
        <div ref={mealSectionRef} style={{ maxWidth: '600px', margin: '0 auto 30px auto', padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '25px', color: '#2d3748', fontWeight: 'bold' }}>
            📅 本日【{displayDate}】の食事はどうだった？
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('not_enough')} style={{ width: '100%', padding: '18px', fontSize: '20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40,167,69,0.15)' }}>
                🟢 少なすぎ （まだ大丈夫）
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#718096' }}>
                ※目安：朝食や昼食を抜いた、忙しくて1食をゼリーだけで済ませたなど
              </span>
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('normal')} style={{ width: '100%', padding: '20px', fontSize: '20px', background: '#ffc107', color: '#212529', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(255,193,7,0.15)' }}>
                🟡 普 通 ・ 腹 八 分 目
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#718096' }}>
                ※目安：いつもの量、腹八分目で抑えられた、バランス良く食べられたなど
              </span>
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => handleMealRecord('overeating')} style={{ width: '100%', padding: '20px', fontSize: '20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220,53,69,0.15)' }}>
                🔴 食 べ す ぎ（やばい）
              </button>
              <span style={{ display: 'block', marginTop: '6px', fontSize: '13px', color: '#718096' }}>
                ※目安：満腹まで食べた、夜遅くに重い食事をした、間食にお菓子を食べすぎたなど
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 🌟 🌟 【体重記録エリア：ref でシステムに場所を教えます！】 */}
      {isLoggedIn && (
        <div ref={weightSectionRef} style={{ maxWidth: '600px', margin: '0 auto 40px auto', padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#2d3748', fontWeight: 'bold' }}>
            ⚖️ 本日【{displayDate}】の現在の体重は？
          </h2>
          
          <form onSubmit={handleWeightSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
              <button type="button" onClick={() => handleAdjustWeight(-1.0)} style={{ padding: '12px 18px', fontSize: '16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' }}>
                ー 1 kg
              </button>

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
                  style={{ width: '120px', padding: '12px', fontSize: '22px', textAlign: 'center', border: '2px solid #28a745', borderRadius: '8px', fontWeight: 'bold', outline: 'none' }} 
                />
                <span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '8px', color: '#333' }}>kg</span>
              </div>

              <button type="button" onClick={() => handleAdjustWeight(1.0)} style={{ padding: '12px 18px', fontSize: '16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' }}>
                ＋ 1 kg
              </button>
            </div>

            <button type="submit" style={{ width: '100%', maxWidth: '400px', padding: '15px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(40,167,69,0.2)' }}>
              ⚖️ 体重を記録する
            </button>

            {weightError && <p style={{ color: 'red', fontWeight: 'bold', marginTop: '10px', margin: 0 }}>⚠️ {weightError}</p>}
            {weightSuccessMessage && <p style={{ color: 'green', fontWeight: 'bold', marginTop: '10px', margin: 0 }}>🎉 {weightSuccessMessage}</p>}
          </form>
        </div>
      )}

      {/* 🟢 🟢 🟢 【最下部固定：共通グリーンフッターメニューエリア！】 */}
      {isLoggedIn && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#f4fbf7', borderTop: '1px solid #d1ebd9', padding: '10px 0', zIndex: 1000, boxShadow: '0 -2px 10px rgba(40,167,69,0.06)' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            
            {/* 1. 食事ボタン（押すと食事エリアへワープ！） */}
            <button onClick={() => scrollToSection(mealSectionRef, 'meal')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeMenu === 'meal' ? '#28a745' : '#718096', fontWeight: 'bold', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ fontSize: '20px' }}>🍴</span>
              <span>食事記録</span>
            </button>

            {/* 2. 体重ボタン（押すと体重エリアへワープ！） */}
            <button onClick={() => scrollToSection(weightSectionRef, 'weight')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeMenu === 'weight' ? '#28a745' : '#718096', fontWeight: 'bold', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ fontSize: '20px' }}>⚖️</span>
              <span>体重記録</span>
            </button>

            {/* 3. 履歴ボタン（今後のカレンダードッキングへの布石！） */}
            <button onClick={() => alert('Week 3の次のイシューで、ここに大感動の「カレンダーカレンダー履歴」がドッキングします！お楽しみに！')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#718096', fontWeight: 'bold', fontSize: '13px' }}>
              <span style={{ fontSize: '20px' }}>📅</span>
              <span>履歴カレンダー</span>
            </button>

            {/* 4. 設定ボタン（ログアウト引き金。次回のその他モーダルへの布石！） */}
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#e53e3e', fontWeight: 'bold', fontSize: '13px' }}>
              <span style={{ fontSize: '20px' }}>⚙️</span>
              <span>ログアウト</span>
            </button>

          </div>
        </div>
      )}
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
