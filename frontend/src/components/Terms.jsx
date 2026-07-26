import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '30px', border: '1px solid #e2e8f0', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', background: 'white', fontFamily: 'sans-serif', textAlign: 'left', lineHeight: '1.7', color: '#2d3748' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1a202c', borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>📝 kanso アプリ利用規約</h2>
      
      <p style={{ marginBottom: '20px', fontSize: '14px', color: '#4a5568' }}>
        この利用規約（以下、「本規約」といいます。）は、kansoアプリ（以下、「当アプリ」といいます。）が提供するすべてのサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。ユーザーの皆様には、本規約に従って本サービスをご利用いただきます。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第1条（適用）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        本規約は、ユーザーと当アプリとの間の本サービスの利用に関わる一切の関係に適用されるものとします。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第2条（利用登録とアカウント管理）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        1. 本サービスにおいては、登録希望者が本規約に同意の上、当アプリの定める方法によって利用登録を申請し、当アプリがこれを承認することによって利用登録が完了します。<br />
        2. ユーザーは、自己の責任において、本サービスのログインパスワードおよびメールアドレスを適切に管理するものとします。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第3条（禁止事項）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        ユーザーは, 本サービスの利用にあたり、不正なアクセス、サーバーやネットワークの機能を破壊する行為、または他のユーザーのデータに干渉する一切の行為を行ってはならないものとします。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第4条（サービスの提供の停止等）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        当アプリは、システムの保守点検や更新、または不可抗力による通信障害が発生した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
      </p>

      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282' }}>第5条（免責事項・損害賠償の制限）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px', background: '#fff5f5', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #dc3545' }}>
        1. 当アプリは、本サービスに事実上または法律上の瑕疵（エラーやバグ、セキュリティに関する欠陥などを含みます。）がないことを保証しておりません。<br />
        2. <strong>ユーザーが本サービスを利用したこと、または利用できなかったことによって生じた一切の損害（精神的苦痛、体調の変動、データの消失を含む一切の不利益）について、当アプリおよび開発者は一切の責任を負いません。</strong>すべてユーザーご自身の自己責任においてご利用いただくものとします。
      </p>

      {/* 🛡️ 【補足追加：第6条】ヘルスケアアプリの命である、医療行為の完全否定の防衛線です！ */}
      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282', fontWeight: 'bold' }}>第6条（医療行為の否定・専門医への相談）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        1. 当アプリが自動計算・提示する目標カロリーや各種指標は、一般的な健康維持を支援するための「目安」であり、<strong>医師の診断、治療、または医療行為に代わるものでは絶対にありません。</strong><br />
        2. ユーザーは、持病や体調に不安がある場合、自己の判断で極端な食事制限や運動を行わず、必ず専門の医師や医療機関の指示に従うものとします。
      </p>

      {/* 🛡️ 【補足追加：第7条】将来アプリが進化して規約をアップデートする権利をガチッと確保します！ */}
      <h3 style={{ fontSize: '16px', marginTop: '25px', color: '#2c5282', fontWeight: 'bold' }}>第7条（利用規約の変更権利）</h3>
      <p style={{ fontSize: '14px', marginLeft: '5px' }}>
        当アプリは、必要と判断した場合には、ユーザーに事前の予告や個別通知をすることなく、いつでも本規約の内容を変更することができるものとします。変更後の規約は、画面上に公開された瞬間からすべてのユーザーに適用されるものとします。
      </p>

      <div style={{ borderTop: '1px solid #edf2f7', marginTop: '40px', paddingTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/register" style={{ color: '#28a745', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>➔ 新規登録画面へ</Link>
        <span style={{ color: '#cbd5e0' }}>|</span>
        <Link to="/login" style={{ color: '#007bff', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>➔ ログイン画面へ</Link>
      </div>
    </div>
  );
}
