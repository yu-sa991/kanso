# frozen_string_literal: true

# 🔐 rack-attack による玄関ドア（ミドルウェア）の超厳格防犯ルール設計図
module Rack
  class Attack
    # 🚷 1. 【ログイン窓口の連打制限（ブルートフォース攻撃対策）】
    # 「同じIPアドレス（req.ip）」からの、ログインAPI（/api/v1/auth/login）へのアクセスを、
    # 【1分間（period: 60）に 5回（limit: 5）まで】に厳格にロックします！
    throttle('logins/ip', limit: 5, period: 60.seconds) do |req|
      req.ip if req.path == '/api/v1/auth/login' && req.post?
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
end
