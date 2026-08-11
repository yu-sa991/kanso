// 🔐 frontend/src/components/Privacy.jsx (正真正銘・全宇宙最終確定版のクリーンコード全文です！)
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'white', fontFamily: 'sans-serif', textAlign: 'left', lineHeight: '1.7', color: '#2d3748' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1a202c', borderBottom: '2px solid #38a169', paddingBottom: '10px' }}>🛡️ プライバシーポリシー</h2>
      
      <p style={{ marginBottom: '20px', fontSize: '14px', color: '#4a5568' }}>
        kansoアプリ（以下、「当アプリ」といいます。）は、本サービス上で提供する一切のサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第1条（個人情報の収集方法）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        当アプリは、ユーザーが利用登録をする際にニックネーム、メールアドレス、パスワードなどの個人情報をお尋ねすることがあります。また、本サービス利用の過程で、年齢、身長、体重、および日々の食事記録などの健康管理データを安全に収集します。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第2条（個人情報を収集・利用する目的）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        当アプリが個人情報を収集・利用する目的は、以下のとおりです。<br />
        1. 本サービスの提供・運営のため（目標摂取カロリーや標準体重の自動計算の算出を含む）<br />
        2. ユーザーが自己の登録データの閲覧、修正、削除、および日々の履歴を振り返るため<br />
        3. ユーザーからの各種お問い合わせに回答するため
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282', fontWeight: 'bold' }}>第3条（個人情報の安全管理・通信の暗号化について）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        当アプリは、入力された個人情報および身体データを不正アクセス、紛失、改ざん、漏洩から守るため、最新のハッシュ暗号化技術および強固なセキュリティ暗号化通信（SSL/HTTPS）を用いて、インターネットの電波からデータベース内へ至るまで厳重に管理を徹底いたします。
      </p>

      {/* 🎯 【ここをお掃除完了！】重複していた昔の1行を綺麗に消去し、法律に基づいてデータを守る最強の第三者提供条項に一本化しました！ */}
      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第4条（個人情報の第三者提供）</h3>
      <div style={{ fontSize: '14px', marginLeft: '5px' }}>
        <p style={{ margin: '0 0 10px 0' }}>当アプリは、ユーザーからお預かりした個人情報（メールアドレス、食事・体重データ等）を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示・提供することは絶対にありません。</p>
        <ul style={{ paddingLeft: '20px', margin: 0, color: '#4a5568' }}>
         <li style={{ marginBottom: '4px' }}>1. ユーザー本人の同意がある場合</li>
         <li style={{ marginBottom: '4px' }}>2. 法令に基づき、裁判所や警察等の公的機関から公式に開示を求められた場合</li>
        </ul>
      </div>

      {/* 🎯 【ここをお掃除完了！】重複して連続していた同じ文章を綺麗に引き算し、見やすく誠実な削除請求対応の段落に一本化しました！ */}
      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282', fontWeight: 'bold' }}>第5条（個人情報の開示・訂正・利用停止・削除請求について）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px', background: '#f0fff4', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #38a169', fontWeight: '500', margin: 0 }}>
        ユーザー本人から、当アプリに保管されているご自身の個人情報や、過去の体重・食事記録データの開示、訂正、利用停止、またはアカウント消去に伴うデータの「完全削除」の申し出があった場合には、ご本人であることを確認させていただいた上で、速やかに対応を行うものとします。
      </p>

       {/* 📁 frontend/src/components/Privacy.jsx の第5条のすぐ下に追記します */}
      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282', fontWeight: 'bold' }}>第6条（プライバシーポリシーの変更）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        1. 本ポリシーの内容は、ユーザーに通知することなく、いつでも変更することができるものとします。<br />
        2. 当アプリが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載した瞬間から効力を生じるものとします。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282', fontWeight: 'bold' }}>第7条（お問い合わせ窓口）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        本ポリシーに関するお問い合わせ、または個人情報の取扱いに伴う各種ご請求は、当アプリ内【お問合せ窓口】よりご連絡ください。
      </p>

      {/* 🏡 新規登録・ログイン画面への帰り道リンク */}
      <div style={{ borderTop: '1px solid #edf2f7', marginTop: '40px', paddingTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/register" style={{ color: '#38a169', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>➔ 新規登録画面へ</Link>
        <span style={{ color: '#cbd5e0' }}>|</span>
        <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>➔ ログイン画面へ</Link>
      </div>
    </div>
  );
}
