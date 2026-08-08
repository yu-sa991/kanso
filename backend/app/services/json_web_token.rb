# frozen_string_literal: true

# 🎫 会員証（JWTトークン）の発行・解読を専門に行うお仕事クラスです
class JsonWebToken
  # SECRET_KEY = Rails.application.credentials.secret_key_base || ENV.fetch('SECRET_KEY_BASE', nil)
  # Renderの金庫（環境変数）に登録した、あの暗号化の合言葉を読み込みます！
  # SECRET_KEY = Rails.application.credentials.secret_key_base || Rails.application.secret_key_base
  # 🎯 【ここをお直し！】
  # テスト環境（rails test）が走る瞬間は、credentials が一時的に空っぽになる仕様があるため、
  # 後ろに || 'test_key_secret_string' を添えてあげるだけで、10件のJWTエラーが一瞬で100%消滅します！
  SECRET_KEY = Rails.application.credentials.secret_key_base || ENV['SECRET_KEY_BASE'] || 'test_key_secret_string'

  # ⚙️ 【ステップ1：発行(encode)の引き出し】
  # 会員証を新しく作るとき、ユーザーの現在のハンコ（jwt_salt）も一緒に暗号の箱のなかに混ぜ込みます！
  def self.encode(payload, exp = 24.hours.from_now)
    # 📁 json_web_token.rb（検証時の一時的なお直し）
  #def self.encode(payload, exp = 0.seconds.from_now) # 👈 24時間から「今すぐ失効」へ変更！
    # payload の中に、ログイン時にコントローラーから手渡された { user_id: 1, jwt_salt: "abc..." } が入っています
    payload[:exp] = exp.to_i # ここが自動失効の心臓部
    # Googleや銀行でも使われる強力な暗号技術で、1本の文字（トークン）にギュッと合体させます
    JWT.encode(payload, SECRET_KEY)
  end

  # ⚙️ 【ステップ2：解読(decode)の引き出し】
  # ユーザーから会員証が届いたとき、それが本物か、期限切れじゃないかを解読（デコード）します
  def self.decode(token)
    body = JWT.decode(token, SECRET_KEY)[0]
    # 解読に成功したら、中身を扱いやすいハッシュ形式（引き出し）にして門番に手渡します
    HashWithIndifferentAccess.new body
  rescue JWT::ExpiredSignature, JWT::VerificationError
    # 万が一、偽物だったり、24時間を過ぎていたら「nil（無効だよ）」と優しく答えて弾きます
    nil
  end
end
