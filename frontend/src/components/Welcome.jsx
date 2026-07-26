import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    // 📱 背景を「すっきりとした白（#ffffff）」をベースにし、文字をパッと見やすいダークグレーに一新！
    <div style={{ minHeight: '100vh', background: '#ffffff', fontFamily: 'sans-serif', color: '#2d3748', boxSizing: 'border-box', paddingBottom: '60px' }}>
      
      {/* 👑 上部ミニバー */}
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <span style={{ fontSize: '18px', fontWeight: '900', color: '#dc2626', letterSpacing: '2px' }}>kanso</span>
        <Link to="/login" style={{ color: '#4a5568', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', border: '1px solid #cbd5e1', padding: '6px 18px', borderRadius: '20px', background: '#f8fafc', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>ログイン</Link>
      </div>

      {/* 🎯 白背景に強烈に映える、現実突きつけ・キャッチコピーエリア */}
      <div style={{ maxWidth: '500px', margin: '40px auto 30px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: '900', lineHeight: '1.5', color: '#1a202c', marginBottom: '20px', letterSpacing: '1px' }}>
          「まだ大丈夫」を、<br />
          <span style={{ color: '#dc2626', borderBottom: '3px solid #dc2626', paddingBottom: '2px' }}>絶対に許さない場所。</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.8', margin: '0 auto', maxWidth: '400px', fontWeight: '500' }}>
          「明日からやろう」「これくらいなら、まだ大丈夫」...<br />
          kansoは、そんな自分への甘えや言い訳を日常から1文字残さず完全粉砕するための、極限までストイックな現実直視型・減量記録アプリです。
        </p>
      </div>

      {/* 🔴 主役の巨大戦闘開始ボタン */}
      <div style={{ padding: '0 20px', marginBottom: '40px' }}>
        <Link to="/register" style={{ display: 'block', maxWidth: '400px', margin: '0 auto', padding: '18px', background: '#dc2626', color: 'white', textDecoration: 'none', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 6px 20px rgba(220,38,38,0.25)', transition: 'transform 0.2s', letterSpacing: '1px' }}>
          🔥 言い訳を捨てて、今すぐ現実と戦う
        </Link>
        <span style={{ display: 'block', marginTop: '10px', fontSize: '12px', color: '#718096', textAlign: 'center' }}>
          ※本気で自分を追い込み、引き締めたい方専用のシステムです
        </span>
      </div>
      {/* 🌟 🌟 🌟 【Baraさん監修：実際の食事3判定ボタンをLPに完全出現させました！】 */}
      <div style={{ maxWidth: '500px', margin: '0 auto 50px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
          <h2 style={{ fontSize: '16px', marginBottom: '20px', color: '#1a202c', fontWeight: 'bold' }}>
            ⚡ 実際のアプリ画面を先行体験（食事の3選択ボタン）
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => alert('【体験モード】\nこの「🟢 少なすぎ」を押した瞬間に、今日の厳しい食事制限の現実が1秒で記録されます。無料登録後に本番環境でお使いください！')} style={{ width: '100%', padding: '14px', fontSize: '18px', background: '#28a745', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(40,167,69,0.15)' }}>
                🟢 少なすぎ （まだ大丈夫）
              </button>
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => alert('【体験モード】\nこの「🟡 普通」を押した瞬間に、腹八分目で抑えられた現実が1秒で記録されます。無料登録後に本番環境でお使いください！')} style={{ width: '100%', padding: '16px', fontSize: '18px', background: '#ffc107', color: '#212529', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(255,193,7,0.15)' }}>
                🟡 普 通 ・ 腹 八 分 目
              </button>
            </div>

            <div style={{ width: '100%', maxWidth: '400px' }}>
              <button onClick={() => alert('【体験モード】\n自分に甘えて食べてしまった時は、この「🔴 食べすぎ」で現実を白黒ハッキリ直視させます。無料登録後に本番環境でお使いください！')} style={{ width: '100%', padding: '16px', fontSize: '18px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(220,53,69,0.15)' }}>
                🔴 食 べ す ぎ（やばい）
              </button>
            </div>
          </div>
          <span style={{ display: 'block', marginTop: '15px', fontSize: '12px', color: '#718096' }}>
            ※文字入力や面倒なカロリー計算は一切排除。3つのボタンを1タップするだけ。
          </span>
        </div>
      </div>
      {/* 💡 言い訳を許さない残りの強固なシステムの解説 */}
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#718096', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px', textAlign: 'center' }}>⚡ 甘えを断つ さらに2つの鉄則機能</h2>

        {/* 特長カード2 */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚖️</span>
            <strong style={{ fontSize: '16px', color: '#1a202c', fontWeight: 'bold' }}>ごまかしを許さない「前回体重の自動固定」</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#4a5568', margin: 0, lineHeight: '1.6' }}>
            画面を開いたその瞬間に、前回入力した本物の体重の数値が全自動で入力欄にパチッと固定されてあなたを待ち構えます。現実の数字から目を背ける（未入力のままにする）言い訳をシステムが完全に完封します。
          </p>
        </div>

        {/* 特長カード3 */}
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>🎯</span>
            <strong style={{ fontSize: '16px', color: '#1a202c', fontWeight: 'bold' }}>逃げ道を塞ぐ「厳格な目標＆標準体重」</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#4a5568', margin: 0, lineHeight: '1.6' }}>
            あなたの性別・身長・年齢を元に、お兄ちゃんの脳みそ（Rails）があなたに必要なリアルな限界カロリーと健康的標準体重を秒速で自動算出。画面上部に常時ロック表示され、あなたの毎日の進捗を監視し続けます。
          </p>
        </div>
      </div>
      {/* 🚀 下部のアクションエリア */}
      <div style={{ maxWidth: '500px', margin: '60px auto 40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#4a5568' }}>自分への「言い訳」を、今夜ここで終わらせる。</h3>
        <Link to="/register" style={{ display: 'block', maxWidth: '400px', margin: '0 auto', padding: '16px', background: '#1e293b', color: 'white', textDecoration: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          ➔ 言い訳禁止の kanso ライフを始める
        </Link>
      </div>

      {/* 🛣️ 📝 🛡️ ✉️ 【法的文書 ＆ お問合せを網羅した、白背景用の親切ライトフッター！】 */}
      <div style={{ borderTop: '1px solid #edf2f7', marginTop: '60px', paddingTop: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', padding: '0 20px', marginBottom: '15px' }}>
          <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#718096', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            利用規約
          </Link>
          <span style={{ color: '#cbd5e0' }}>•</span>
          <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#718096', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            プライバシーポリシー
          </Link>
          <span style={{ color: '#cbd5e0' }}>•</span>
          
          <button onClick={() => alert('【お問合せ窓口】\nkansoアプリへのご意見・ご要望、または不具合のご報告は開発者（Bara）までお寄せください。\n※本番リリース後、ここに専用のお問合せフォームがドッキングします！')} style={{ background: 'none', border: 'none', padding: 0, color: '#718096', cursor: 'pointer', fontSize: '13px', fontWeight: '500', fontFamily: 'sans-serif' }}>
            お問合せ
          </button>
        </div>
        
        <p style={{ fontSize: '12px', color: '#a0aec0', margin: 0 }}>
          &copy; {new Date().getFullYear()} kanso. All rights reserved.
        </p>
      </div>

    </div>
  );
}
