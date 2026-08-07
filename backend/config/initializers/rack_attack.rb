# frozen_string_literal: true

# 🔐 rack-attack による玄関ドア（ミドルウェア）の超厳格防犯ルール設計図
class Rack::Attack
  # 🚷 1. 【ログイン窓口の連打制限（ブルートフォース攻撃対策）】
  # Rails特有のパラメータネスト（authentication => email）の引き出しに100%完全対応！
  # これにより、同一アドレスに対する【1分間に 5回まで】の連打を、手元でも本番でも100%確実にロックします！
  throttle('logins/email', limit: 5, period: 60.seconds) do |req|
    if req.path == '/api/v1/login' && req.post?
     #if req.path == '/api/v1/auth/login' && req.post?
      # 大元の params['email'] が空っぽだった場合は、深い params['authentication']['email'] の中身を自動で探しにいきます！
      email = req.params['email'] || (req.params['authentication'] && req.params['authentication']['email'])
      
      # 1文字の隙もなく綺麗に整形して、防犯の識別キー（ハンコ）として門番に渡します
      email.to_s.downcase.strip if email.present?
    end
  end

  # 🚨 2. 【ハッカーが制限を超えた時のオマケ：429エラーの笑顔返却】
  # 1分間に6回以上ボタンを連打した不審者に対して、サーバー内部を触らせずに、
  # 玄関先で「429 Too Many Requests」と親切な日本語メッセージを一律で返却して完全遮断します！
  self.throttled_responder = lambda do |_env|
    [
      429,
      { 'Content-Type' => 'application/json' },
      [{ error: '短時間に何度もログインが試行されました。安全のため、1分ほど時間を置いてから再度お試しください。' }.to_json]
    ]
  end
end
