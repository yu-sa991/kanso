# frozen_string_literal: true

# User model class
class User < ApplicationRecord
  # これだけで生のパスワードを世界一安全な暗号の塊に変形させるRails最強の防犯機能です！
  has_secure_password

  # 🔒 【ここを追加！】 jwt_salt（暗号の塩）を自動リセット・管理する最強の防犯スイッチです
  # ① 新規登録時に、世界に1つのランダムなハンコ（jwt_salt）を全自動で配ります
  before_create :initialize_jwt_salt
  # ② 【ハッカー完全撃退！】本人がパスワードを変更した瞬間、古いハンコを破壊して新しいハンコへ強制リセットします！
  before_update :reset_jwt_salt, if: :will_save_change_to_password_digest?


  # 🛡️ 名前を必須にし、メールアドレスの二重登録（重複）を完全にブロックする最強の防犯ロックです！
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  # 🔒 パスワードの文字数を「最低6文字以上」に強制ロックする最強の防犯バリデーションです！
  validates :password, length: { minimum: 6 }, allow_nil: true

  # ユーザーは「1つのプロフィール」を持っています（ユーザーが消えたら、プロフィールも一緒に全自動で消去（dependent: :destroy）されます！）
  has_one :profile, dependent: :destroy

  # ユーザーは「たくさんの食事記録（カレンダー）」を持っています
  # （※ユーザーが退会したら、その人の過去の食事記録も全自動で一緒に綺麗に消去されます！）
  has_many :meal_records, dependent: :destroy

  # 🔗 ユーザーは「たくさんの体重記録」を持っています
  # （※ユーザーが退会したら、その人の過去の体重記録もデータベース内から全自動で綺麗にお掃除されます！）
  has_many :weight_records, dependent: :destroy

  # 🔑 1. パスワード再設定用の「使い切り暗号鍵」を生成してデータベースに保存する関数
  def create_password_reset_token
    # 他人に200%絶対に推測されない、ランダムな安全な文字列（トークン）を生成します
    self.password_reset_token = SecureRandom.urlsafe_base64
    # 「たった今、鍵を発行したよ」というタイムスタンプを刻みます（有効期限チェック用）
    self.password_reset_sent_at = Time.current
    # 新設した金庫（カラム）へ、バリデーションをスキップして高速保存します
    save!(validate: false)
  end

  # ⏳ 2. 発行された暗号鍵が、今「有効期限内（例: 30分以内）」かどうかを厳格にチェックする関数
  def password_reset_expired?
    # 鍵が発行された時間（password_reset_sent_at）から、30分以上が経過していたら「true（期限切れだよ）」と答えます
    password_reset_sent_at < 30.minutes.ago
  end

   private # 🔒 ここから下は、Userモデルの内部だけで使う秘密の隠し部屋です！

  # 🔑 アカウント作成時に最初のハンコを刻む関数
  def initialize_jwt_salt
    self.jwt_salt = SecureRandom.hex(16)
  end

  # 🧹 パスワード変更時に、ハッカーの手元の古いJWTを一斉無効化（強制ログアウト）させる最強の関数
  def reset_jwt_salt
    self.jwt_salt = SecureRandom.hex(16)
  end
end
 
