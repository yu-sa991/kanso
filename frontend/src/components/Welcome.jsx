import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    // 📱 自分への甘えを一切遮断する、最高にシリアスな漆黒とダークグレーのストイックデザイン
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #111827, #0f172a)', fontFamily: 'sans-serif', color: '#f8fafc', boxSizing: 'border-box', paddingBottom: '60px' }}>
      
      {/* 👑 上部ミニバー */}
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'black', color: '#dc2626', letterSpacing: '2px' }}>kanso</span>
        <Link to="/login" style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', border: '1px solid #475569', padding: '6px 18px', borderRadius: '20px', background: '#1e293b', boxShadow: '0 4px 6px rgba(0,0,0,0.2)' }}>ログイン</Link>
      </div>

      {/* 🎯 強烈な現実突きつけ・キャッチコピーエリア */}
      <div style={{ maxWidth: '500px', margin: '40px auto 30px auto', padding: '0 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 'black', lineHeight: '1.5', color: '#ffffff', marginBottom: '20px', letterSpacing: '1px' }}>
          「まだ大丈夫」を、<br />
          <span style={{ color: '#dc2626', borderBottom: '3px solid #dc2626', paddingBottom: '2px' }}>絶対に許さない場所。</span>
        </h1>
        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.8', margin: '0 auto', maxWidth: '400px', fontWeight: '500' }}>
          「明日からやろう」「これくらいなら、まだ大丈夫」...<br />
          kansoは、そんな自分への甘えや言い訳を日常から1文字残さず完全粉砕するための、極限までストイックな現実直視型・減量記録アプリです。
        </p>
      </div>

      {/* 🔴 主役の巨大戦闘開始ボタン */}
      <div style={{ padding: '0 20px', marginBottom: '50px' }}>
        <Link to="/register" style={{ display: 'block', maxWidth: '400px', margin: '0 auto', padding: '18px', background: '#dc2626', color: 'white', textDecoration: 'none', borderRadius: '14px', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 6px 20px rgba(220,38,38,0.4)', transition: 'transform 0.2s', letterSpacing: '1px' }}>
          🔥 言い訳を捨てて、今すぐ現実と戦う
        </Link>
        <span style={{ display: 'block', marginTop: '10px', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
          ※本気で自分を追い込み、引き締めたい方専用のシステムです
        </span>
      </div>
      {/* 💡 言い訳を許さない「3つの強固なシステム」の解説 */}
      <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px', textAlign: 'center' }}>⚡ 甘えを断つ 3つの鉄則機能</h2>

        {/* 特長カード1 */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>🔴</span>
            <strong style={{ fontSize: '16px', color: '#ffffff', fontWeight: 'bold' }}>容赦ない食事3判定（🟢🟡🔴）</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>
            面倒なカロリーの言い訳は一切受け付けません。今日のあなたの食事が「少なすぎ」でストイックに耐え抜いたか、「普通」か、それとも「食べすぎ（やばい）」で自分に甘えたかを、3つのボタンで白黒ハッキリと強制ジャッジします。
          </p>
        </div>

        {/* 特長カード2 */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>⚖️</span>
            <strong style={{ fontSize: '16px', color: '#ffffff', fontWeight: 'bold' }}>ごまかしを許さない「前回体重の自動固定」</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>
            画面を開いたその瞬間に、前回入力した本物の体重の数値が全自動で入力欄にパチッと固定されてあなたを待ち構えます。現実の数字から目を背ける（未入力のままにする）言い訳をシステムが完全に完封します。
          </p>
        </div>

        {/* 特長カード3 */}
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <span style={{ fontSize: '24px' }}>🎯</span>
            <strong style={{ fontSize: '16px', color: '#ffffff', fontWeight: 'bold' }}>逃げ道を塞ぐ「厳格な目標＆標準体重」</strong>
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, lineHeight: '1.6' }}>
            あなたの性別・身長・年齢を元に、お兄ちゃんの脳みそ（Rails）があなたに必要なリアルな限界カロリーと健康的標準体重を秒速で自動算出。画面上部に常時ロック表示され、あなたの毎日の進捗を監視し続けます。
          </p>
        </div>
      </div>
      {/* 🚀 下部のアクションエリア */}
      <div style={{ maxWidth: '500px', margin: '60px auto 40px auto', padding: '0 20px', textAlign: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', color: '#cbd5e1' }}>自分への「言い訳」を、今夜ここで終わらせる。</h3>
        <Link to="/register" style={{ display: 'block', maxWidth: '400px', margin: '0 auto', padding: '16px', background: '#ffffff', color: '#111827', textDecoration: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(255,255,255,0.1)' }}>
          ➔ 言い訳禁止の kanso ライフを始める
        </Link>
      </div>

      {/* 🛣️ 📝 🛡️ ✉️ 【Baraさん完全監修：法的文書 ＆ お問合せを網羅した最強ダークフッター！】 */}
      <div style={{ borderTop: '1px solid #1e293b', marginTop: '60px', paddingTop: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', padding: '0 20px', marginBottom: '15px' }}>
          <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            利用規約
          </Link>
          <span style={{ color: '#334155' }}>•</span>
          <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
            プライバシーポリシー
          </Link>
          <span style={{ color: '#334155' }}>•</span>
          
          {/* ✉️ 【ここを追加！】ログイン前の初めての人でも、フッターから1タップでお問合せ案内が浮かび上がります！ */}
          <button onClick={() => alert('【お問合せ窓口】\nkansoアプリへのご意見・ご要望、または不具合のご報告は開発者（Bara）までお寄せください。\n※本番リリース後、ここに専用のお問合せフォームがドッキングします！')} style={{ background: 'none', border: 'none', padding: 0, color: '#64748b', cursor: 'pointer', fontSize: '13px', fontWeight: '500', fontFamily: 'sans-serif' }}>
            お問合せ
          </button>
        </div>
        
        <p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>
          &copy; {new Date().getFullYear()} kanso. All rights reserved.
        </p>
      </div>

    </div>
  );
}
