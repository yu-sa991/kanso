# frozen_string_literal: true

# JsonWebToken class
class JsonWebToken
  # Renderの金庫（環境変数）に登録した、あの暗号化の合言葉を読み込みます！
  SECRET_KEY = Rails.application.credentials.secret_key_base || Rails.application.secret_key_base

  # デジタル会員証（JWT）をガシャンと新しく「発行（エンコード）」
  def self.encode(payload, exp = 24.hours.from_now)
    # チケットに「24時間後に自動で使えなくなる（有効期限）」という防犯タイマーをセット
    payload[:exp] = exp.to_i
    JWT.encode(payload, SECRET_KEY)
  end

  # ユーザーから届いたチケットが偽造されていないか「解読（デコード）」
  def self.decode(token)
    body = JWT.decode(token, SECRET_KEY)[0]
    HashWithIndifferentAccess.new(body)
  rescue JWT::ExpiredSignature, JWT::VerificationError
    # 万が一、有効期限が切れていたり、ハッカーが1文字でも文字を書き換えていたら「無効（nil）」と判定
    nil
  end
end
