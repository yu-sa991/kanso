// ⭕ 修正後：未使用の React を消して、使う道具（useStateら）だけをスマートに読み込みます！
import { useState, useEffect, useRef } from 'react'; // 🚀 画面内の位置を指さすための「useRef」を新しく読み込みます！
//import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'; // 🚀 Link を優しく大復活！
import axios from 'axios'; // 🚀 通信ツールを読み込みます！

// 🎯 各種セキュリティ・快適画面パーツを一斉に公式読み込みします！
import Calendar from './components/Calendar';
// 🎯新設したおねだりハムスターの部屋をインポートして呼び出します！
import OnedariCharacter from './components/OnedariCharacter';
// 🎯 【ここを追記！】新設した体重入力パーツの部屋をインポートして呼び出します！
import WeightRecorderView from './components/WeightRecorderView';
import Register from './components/Register';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import RequireAuth from './components/RequireAuth';
// 新設したパスワード再設定画面をアプリに読み込みます！
import PasswordReset from './components/PasswordReset';
import ForgotPassword from './components/ForgotPassword'; // 🎯 これを上部に追加！


// 🔗 各種静的画面・Top紹介ページを公式に読み込みます！
import Terms from './components/Terms'; 
import Privacy from './components/Privacy'; 
// 🔗 新設した漆黒のストイック紹介ページをアプリへ公式に読み込みます！
import Welcome from './components/Welcome'; 


//🌟 1. ファイルの一番上のほうにこの自動切り替えスイッチをコピペします
const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:3000' : 'https://kanso-8m4l.onrender.com';

// 🏡 【メインの記録部屋：MainHome】ログインに合格した本気の人だけが入れる専用のお部屋！
//function Home() {
function MainHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //🧠 Railsから届く計算数値をしまっておく箱（ステート）を用意します！
  const [targetCalories, setTargetCalories] = useState(null);
  const [standardWeight, setStandardWeight] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 👤 ログインしているユーザーのお名前をしまっておく箱（ステート）を用意します！
  const [userName, setUserName] = useState('');


  //⚖️ 体重入力用の箱（ステート）を用意します！
  const [weightInput, setWeightInput] = useState('');
  const [weightSuccessMessage, setWeightSuccessMessage] = useState('');
  //🎯 体重専用のエラーメッセージを入れる箱を新しく用意します！
  const [weightError, setWeightError] = useState('');

  //📅 本日の日付（〇月〇日）を画面に優しく表示するための箱（ステート）
  const [displayDate, setDisplayDate] = useState('');

// 🎯 【食事・体重のお祝い文字大復活のネジ！】保存状態をしっかりと管理します！
  //const [mealRecord, setMealRecord] = useState(null);
  // 🎯 【ここをお直し完了！】先頭に「mealRecord」の名前をしっかりと大復活させて書き戻します！
  const [mealRecord, setMealRecord] = useState<any>(null); // 🎯 先頭の mealRecord を空文字（,）にして、お掃除完了です！
  const [mealSuccess, setMealSuccess] = useState(false);


  // 📅 【ここを記述（追加）！】カレンダーのポップアップが開いているかを管理するスイッチです！
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);


  // 🟢 フッターメニューのどのボタンがピカッと点灯（アクティブ）しているかを管理する箱
  const [activeMenu, setActiveMenu] = useState('meal');

  // ⚙️ その他（設定）モーダルが「今開いているか（true）」「閉じているか（false）」を管理する箱！
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  // 🎯 【画面内エレベーター連動のネジ配置！】
  // 画面内の「食事記録エリア」「体重記録エリア」、そして新設する「カレンダーエリア」の場所を、
  // システムに正確に指さして教えるためのピン（Ref）を一斉に用意します！
  const mealSectionRef = useRef(null);
  const weightSectionRef = useRef(null);
  //const calendarSectionRef = useRef(null);
  
  useEffect(() => {

    {/*// ブラウザに「絶対に自動翻訳させるな！」と強制命令を出す、無敵の防犯コードです。
    // これにより、ブラウザの勘違いによるメッセージの消滅を一撃で完全完封します！
    document.documentElement.lang = 'ja';
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);*/}

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
           
          // 👤 Rails側から届いた「お名前」を React の頭脳に記憶します！
          if (response.data.profile && response.data.profile.user) {
            setUserName(response.data.profile.user.name);
          } else {
            // 万が一の予備用として、お名前データが別ルートで届いた場合もキャッチ
            setUserName(response.data.user_name || 'ユーザー');
          }
        }
      })
      .catch(error => {
        console.error('データの取得に失敗しました', error);
      });

      // ⚖️ 【超親切機能！】
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

   // 🚀 ヘッダーの固定分を考慮して、ターゲットの場所まで優しく自動ワープさせる関数です
  const scrollToSection = (sectionRef, menuName) => {
    setActiveMenu(menuName);
    if (sectionRef && sectionRef.current) {
      const yOffset = -110; 
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };


  // 📥 🟢🟡🔴 巨大ボタンを押したときにRailsへ瞬時にデータを送信する関数
  const handleMealRecord = async (statusValue) => {
    setError('');
    const token = localStorage.getItem('token');
    //const today = new Date().toISOString().split('T')[0]; // ⭕ 完璧なお直しバージョン！

    // 🌍 【ここを修正完了！】時差の計算バグを排除し、100%確実に日本時間の「今日の日付」を割り出します！
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


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

      if (response.status === 201 ) {
        setMealRecord(response.data.meal_record);
        alert('今日の食事判定を記録しました！');
        // 1.5秒間お祝い文字を出してから、裏のカレンダーへ数値を安全に同期させます！
        // 5000（5秒）にたっぷり引き伸ばすことで、ポップアップ（アラート）を閉じたあとも 
        setTimeout(() => { setMealSuccess(false); window.location.reload(); }, 10000);
        //window.location.reload(); 
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // 🎯 【ここをお直し！】
        // Railsから届いたエラーメッセージを結合（join）したあと、
        // もし先頭に余計な「Date 」という英語が混ざっていたら、一瞬で綺麗に消去（空文字に置換）します！
        let rawError = err.response.data.errors.join('、');
        let cleanError = rawError.replace(/^Date\s*/i, ''); // 🧹 先頭の「Date 」を跡形もなく消し去る魔法です！
        setError(cleanError);
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
    //const today = new Date().toISOString().split('T')[0]; // ⭕ 完璧なお直しバージョン！

    // 🌍 【ここを修正完了！】体重側でも100%確実に日本時間の「今日の日付」を割り出して送信します！
    const d = new Date();
    const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;


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

      if (response.status === 201 ) {
        setWeightSuccessMessage(response.data.message || '今日の体重を記録しました！');
        alert('今日の体重を記録しました！');
         // 1.5秒間お祝い文字を出してから、裏のカレンダーへ数値を安全に同期させます！
        // 5000（5秒）にたっぷり引き伸ばすことで、ポップアップ（アラート）を閉じたあとも
        setTimeout(() => { setWeightSuccessMessage(''); window.location.reload(); }, 10000);
        //window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        // 🎯 【ここをお直し！】
        // 体重側でも、届いたメッセージの先頭に余計な「Date 」という英語が混ざっていたら、一瞬で綺麗に消去します！
        let rawError = err.response.data.errors.join('、');
        let cleanError = rawError.replace(/^Date\s*/i, ''); // 🧹 先頭の「Date 」を抹殺する無敵のモップです！
        setWeightError(cleanError);
      } else {
        setWeightError('体重の保存に失敗しました。1日1件の制限、または通信状態を確認してください。');
      }
    }
  };

  {/*// 📱 】フッターメニューを押したときに、画面移動せずエレベーターのように滑らかに案内する関数
  const scrollToSection = (sectionRef, menuName) => {
    setActiveMenu(menuName); // 押しボタンの緑色をピカッと切り替える

    if (sectionRef && sectionRef.current) {
      // 🚀 ヘッダーの固定分（少し上）を考慮して、ターゲットの場所まで優しくスルルーッと自動スクロール！
      const yOffset = -110; 
      const element = sectionRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' }); // smooth を指定することで極上の滑らかさに！
    }
  };*/}

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setTargetCalories(null);
    setStandardWeight(null);
    setUserName('');
    setIsModalOpen(false);
    alert('ログアウトしました！');
  
     // 🎯 ログアウトした後は、アプリの「顔」であるトップURL（/）へと綺麗に戻るようにしました！
    navigate('/'); 
};


  return (
    // 📱 外側の枠組み：フッターが最下部に固定されるため、お尻にゆとり（paddingBottom）を持たせます
    <div style={{ padding: '90px 20px 100px 20px', textAlign: 'center', fontFamily: 'sans-serif', background: '#fafafa', minHeight: '100vh', boxSizing: 'border-box' }}>
      
      {/* 👑 👑 👑 【上部固定ヘッダーエリア：position: fixed で画面上にガチッと固定！】 */}
      {isLoggedIn && targetCalories && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'white', borderBottom: '1px solid #e2e8f0', padding: '10px 15px', zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

            {/* 👤 左側にお名前を優しく追記し、特別感を演出します！ */}
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '13px', color: '#718096', display: 'block', fontWeight: '500' }}>WELCOME</span>
              <strong style={{ fontSize: '15px', color: '#2d3748' }}>👤 {userName || 'ユーザー'} さんの目標</strong>
            </div> 
            
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
            {/* 🎯 【大復活！】食事の成功お祝いメッセージを正しい場所に灯します！ */}
            {mealSuccess && <p style={{ color: '#28a745', fontWeight: 'bold', textAlign: 'center', marginTop: '20px', margin: 0 }}>🎉 今日の食事を記録しました！</p>}          
        </div>
      )}

      {/* 🌟 🌟 🌟 【体重記録エリア：ref でシステムに場所を教えます！】 *
      {isLoggedIn && (
        <div ref={weightSectionRef} style={{ maxWidth: '600px', margin: '0 auto 40px auto', padding: '25px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#2d3748', fontWeight: 'bold' }}>
            ⚖️ 本日【{displayDate}】の現在の体重は？
          </h2>
          
          <form onSubmit={handleWeightSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', maxWidth: '400px', justifyContent: 'center' }}>
              <button type="button" onClick={() => handleAdjustWeight(-1.0)} style={{ padding: '12px 18px', fontSize: '16px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#475569' }}>
                ー 1 kg
              </button>*/}

                           {/* 🎯 【TypeScript型チェック完全大合格仕様！】
                  as HTMLInputElement を添えることで、型エラー(TS2339)を一撃で100%完全に完封します！
                  これにより、ドットを含めて5桁を超えるタイピングを、本番環境でも物理的に完全ストップさせます！ 
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <input 
                  type="number" 
                  id="today-weight"
                  name="weight"
                  autoComplete="off"
                  step="0.1" 
                  min="1"
                  max="300"
                  onInput={(e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.value.length > 5) {
                      target.value = target.value.slice(0, 5);
                    }
                  }}
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
      )}*/}

       {/*📅 【ここを記述（追加）！】
          固定フッターメニューの真上（大元のdivが閉じる直前）に、目印ピン（Ref）を添えた振り返りカレンダーを堂々ドッキングします！
          これにより、フッターの「履歴カレンダー」ボタンを押した瞬間に、この場所へ一瞬で自動ワープできるようになります！  
      <div ref={calendarSectionRef}>
        <hr style={{ border: '0', height: '1px', background: '#e2e8f0', margin: '40px 0' }} />
        <Calendar />
      </div>*/}

        {/*🎯 【ここを記述（追加・大お引っ越し大成功！）】
          Baraさんの理想の配置！食事記録やハムスターのすぐ真上に、
          新しくファイルを独立させた「体重記録エリア」がクリーンにドッキングします！*/}
      {isLoggedIn && (
        <WeightRecorderView 
          displayDate={displayDate}
          weightInput={weightInput}
          setWeightInput={setWeightInput}
          handleWeightSubmit={handleWeightSubmit}
          handleAdjustWeight={handleAdjustWeight}
          weightError={weightError}
          weightSuccessMessage={weightSuccessMessage}
          weightSectionRef={weightSectionRef}
        />
      )}

      {/*【ここを記述（追加）！】
          食事記録カードのすぐ真上に、今日の判定と連動して体型が変わるおねだりキャラが着地します！
          mealRecord={mealRecord} と添えることで、今日のデータをハムスターへ安全に手渡します。*/}
      {isLoggedIn && <OnedariCharacter mealRecord={mealRecord} />}


   {/* ⚙️ 👥 🔒 📝 🛡️ 【メールアドレス変更・規約・ポリシーがガチッと合体した無敵のモーダル！】 */}
      {isLoggedIn && isModalOpen && (
        <>
          {/* 👥 背景の黒い半透明のクッション */}
          <div onClick={() => setIsModalOpen(false)} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.4)', zIndex: 999 }}></div>
          
          {/* 🤍 白い引き出し本体（メニューが増えたため、高さをスマホで見やすいように自動調整します！） */}
          <div style={{ position: 'fixed', bottom: '70px', left: '10px', right: '10px', background: 'white', borderRadius: '20px', padding: '20px', zIndex: 1000, boxShadow: '0 -4px 20px rgba(0,0,0,0.15)', maxWidth: '580px', margin: '0 auto', textAlign: 'left', maxHeight: '75vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <strong style={{ fontSize: '16px', color: '#2d3748' }}>⚙️ 設定 ＆ アカウント管理</strong>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#aaa' }}>×</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {/* 🔧 1. アカウント設定グループ */}
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#a0aec0', paddingLeft: '10px', marginTop: '5px' }}>ACCOUNT SETTINGS</span>
              <button onClick={() => alert('ここに「👤 プロフィール編集画面」が合流します！')} style={{ width: '100%', padding: '12px 10px', background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500' }}>
                👤 プロフィール・目標設定の編集
              </button>
              
              {/* 📧 メールアドレスの再設定ボタン */}
              <button onClick={() => alert('ここに安全な「📧 メールアドレス再設定画面」が合流します！')} style={{ width: '100%', padding: '12px 10px', background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500' }}>
                📧 メールアドレスの再設定
              </button>
              
              <button onClick={() => alert('ここに「🔒 パスワードの再設定画面」が合流します！')} style={{ width: '100%', padding: '12px 10px', background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500' }}>
                🔒 パスワードの再変更
              </button>
              
               <div style={{ borderTop: '1px solid #f1f5f9', margin: '5px 0' }}></div>

              {/* 💡 2. 【ここを追加！】ユーザーサポート案内グループ */}
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#a0aec0', paddingLeft: '10px' }}>SUPPORT & GUIDE</span>
              
              {/* 💡 【使い方ガイドボタン】 */}
              <button onClick={() => alert('【kanso アプリの使い方】\n① 食事記録：毎日の食事量に合わせて「🟢🟡🔴」の巨大ボタンを1タップで記録！\n② 体重記録：毎日の体重を入力するか、「＋1kg / ー1kg」ボタンでサクッと微調整して保存！\n③ 履歴：溜まった記録は今後のカレンダーでいつでも楽しく振り返れます。')} style={{ width: '100%', padding: '12px 10px', background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500' }}>
                💡 アプリの使い方の確認
              </button>

              {/* ✉️ 【お問合せボタン：将来Googleフォームやメールリンクを貼るための布石！】 */}
              <button onClick={() => alert('【お問合せ窓口】\nアプリへのご意見・ご要望、または不具合のご報告は、サポート窓口までお気軽にお寄せください。\n※今後のアップデートで専用のお問合せフォームがここにドッキングします！')} style={{ width: '100%', padding: '12px 10px', background: 'none', border: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500' }}>
                ✉️ お問合せ窓口
              </button>

              <div style={{ borderTop: '1px solid #f1f5f9', margin: '5px 0' }}></div>

              {/* 📝 2. アプリの法的信頼性グループ（利用規約・プライバシーポリシー） */}
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#a0aec0', paddingLeft: '10px' }}>LEGAL & POLICY</span>
              
              {/* 📝 【利用規約ボタン】➔ 今回作った Terms.jsx ページへ、別タブで優しく使い回し表示させます！ */}
              <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', padding: '12px 10px', boxSizing: 'border-box', textDecoration: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500', transition: 'background 0.2s' }}>
               📝 アプリ利用規約の確認
              </Link>

              {/* 🛡️ 【プライバシーポリシーボタン】➔ 今回作った Privacy.jsx ページへ、別タブで優しく使い回し表示させます！ */}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', padding: '12px 10px', boxSizing: 'border-box', textDecoration: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#4a5568', borderRadius: '8px', fontWeight: '500', transition: 'background 0.2s' }}>
               🛡️ プライバシーポリシーの確認
              </Link>


              <div style={{ borderTop: '1px solid #f1f5f9', margin: '8px 0' }}></div>
              
              <button onClick={handleLogout} style={{ width: '100%', padding: '14px 10px', background: '#fff5f5', border: 'none', textAlign: 'left', fontSize: '14px', cursor: 'pointer', color: '#e53e3e', borderRadius: '8px', fontWeight: 'bold' }}>
                🚪 アプリから安全にログアウトする
              </button>
            </div>
          </div>
        </>
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

             {/* 🎯 【ここをお直し完了！】履歴ボタンを押した瞬間、アラートではなくカレンダーポップアップ（isCalendarOpen）がフワッと大起動します！ */}
            <button onClick={() => { setIsCalendarOpen(true); setActiveMenu('calendar'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeMenu === 'calendar' ? '#28a745' : '#718096', fontWeight: 'bold', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ fontSize: '20px' }}>📅</span>
              <span>履歴カレンダー</span>
            </button>

             {/* 🎯 【ここを記述（アップデート完了）！】履歴カレンダーボタンを押したそのコンマ1秒後に、上のカレンダーエリアへエレベーターのようにフワッと自動ワープ（スクロール）します！ 
            <button onClick={() => scrollToSection(calendarSectionRef, 'calendar')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeMenu === 'calendar' ? '#28a745' : '#718096', fontWeight: 'bold', fontSize: '13px', transition: 'color 0.2s' }}>
              <span style={{ fontSize: '20px' }}>📅</span><span>履歴カレンダー</span>
            </button>*/}
            
           {/* ⚙️ 【ここが大進化！】下から引き出しをフワッと出現させるトリガー */}
            <button onClick={() => { setIsModalOpen(!isModalOpen); setActiveMenu('settings'); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: activeMenu === 'settings' ? '#28a745' : '#718096', fontWeight: 'bold', fontSize: '13px' }}>
              <span style={{ fontSize: '20px' }}>⚙️</span>
              <span>設定・その他</span>
            </button>
          </div>
        </div>
      )}

  {/* 🎯 【ここに記述（大新設）します！】
      フッターの履歴ボタンと完全に連動し、画面中央にフワッと浮かび上がるカレンダーモーダルです！ */}
      {isLoggedIn && isCalendarOpen && (
        <>
          {/* 🟢 背景のクッション：優しくカレンダーを浮かび上がらせる、少し緑を含んだ大安全な半透明マット */}
          <div onClick={() => setIsCalendarOpen(false)} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, background: 'rgba(24, 48, 32, 0.4)', zIndex: 1999, backdropFilter: 'blur(4px)' }}></div>
          
          {/* 🟢 白い引き出し本体：ぷっくりとした超丸っこい角（32px）と、優しく包むkansoグリーン（#f4fbf7）の背景デザイン！ */}
          <div style={{ position: 'fixed', top: '6%', bottom: '6%', left: '16px', right: '16px', background: '#f4fbf7', borderRadius: '32px', padding: '25px 20px', zIndex: 2000, boxShadow: '0 12px 36px rgba(40,167,69,0.12)', maxWidth: '650px', margin: '0 auto', overflowY: 'auto', border: '2px solid #d1ebd9', boxSizing: 'border-box' }}>
            
            {/* 🎀 上部のヘッダー：丸文字に合うように、文字間を少し優しく広げて丸っこい閉じるボタンとドッキング！ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '2px dashed #13a54b', paddingBottom: '12px' }}>
              <strong style={{ fontSize: '18px', color: '#510aa2', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                📅 <span style={{ letterSpacing: '0.5px' }}>振り返り履歴カレンダー</span>
              </strong>
              {/* 🟢 ×ボタン：カチッとした四角を廃止し、押しやすくてかわいい「ぷっくり丸いグリーン調ボタン」へ格上げ！ */}
              <button onClick={() => setIsCalendarOpen(false)} style={{ background: '#08fe62', border: '1px solid #0ba53c', fontSize: '18px', cursor: 'pointer', color: '#e6f918', width: '36px', height: '32px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', transition: 'all 0.2s' }}>
                ×
              </button>
            </div>
            
            {/* 🤍 内側の白いカード：FullCalendarの四角い枠を、kanso風の優しい丸っこい白背景（borderRadius: '24px'）でふんわり包み込みます！ */}
            <div style={{ background: 'white', padding: '15px', borderRadius: '24px', border: '1px solid #4eee0a', boxShadow: '0 4px 12px rgba(95, 189, 27, 0.02)' }}>
              <Calendar />
            </div>
          </div>
        </>
      )}

    </div>
  );
}

{/*// 🗺️ ランディングページ（Top紹介ページ）の仮部屋です
function Welcome() {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>kanso アプリへようこそ！</h1>
      <p>「まだ大丈夫」を記録して、心に余白を作る場所。</p>
      <button onClick={() => window.location.href = '/login'} style={{ padding: '12px 24px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px' }}>
        ログインしてはじめる
      </button>
    </div>
  );
}*/}


export default function App() {
  return (
    <Router>
      <Routes>
         {/* 🛣️ ① 一番最初のトップの住所（/）を開いたら、100%フリーで「あの紹介ページ」を出す大正解の形へ変更！ */}
        <Route path="/" element={<Welcome />} />
        {/* 🔒 1. 【ログイン中専用エリア】すでに初期設定を全て終えたリピーターさんだけが入れる聖域の部屋 */}
        {/*<Route path="/" element={<RequireAuth><Home /></RequireAuth>} />*/}
        {/* 🔒 ② 【メイン記録部屋】ログインに合格した本気の人だけが入れる、セキュリティの砦に守られた専用のお部屋！ */}
        <Route path="/home" element={<RequireAuth><MainHome /></RequireAuth>} />


        {/* 🔓 2. 【未登録・登録前フリーアクセスエリア】生まれたての新規アカウントでも100%弾かれずに通れる道 */}
        {/* (※ProfileSetup を RequireAuth の外側へ出してあげることで、真っ白フリーズを200%完全に完封します！) */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* 🛣️ 3. 【世界中の誰もが100%フリーで通れる完全な法的公道エリア】 */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      
        {/* 🗺️ 4. 【今回のMVPの主役：ログイン前の初めての人が一番最初に来る「Top紹介ページ」を開通！】 */}
        {/* (※RequireAuth の外側に独立させ、専用の通り道を開いたため、未ログインの初めての人でも絶対にフリーズしません！) */}
        {/*<Route path="/welcome" element={<Welcome />} />*/}
     </Routes>
    </Router>
  );
}
