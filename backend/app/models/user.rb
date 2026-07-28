# frozen_string_literal: true

# User model class
class User < ApplicationRecord
  # これだけで生のパスワードを世界一安全な暗号の塊に変形させるRails最強の防犯機能です！
  has_secure_password

  # 🛡️ 名前を必須にし、メールアドレスの二重登録（重複）を完全にブロックする最強の防犯ロックです！
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  # 🔒 【ここを追加！】パスワードの文字数を「最低6文字以上」に強制ロックする最強の防犯バリデーションです！
  validates :password, length: { minimum: 6 }, allow_nil: true

  # ユーザーは「1つのプロフィール」を持っています（ユーザーが消えたら、プロフィールも一緒に全自動で消去（dependent: :destroy）されます！）
  has_one :profile, dependent: :destroy

  # ユーザーは「たくさんの食事記録（カレンダー）」を持っています
  # （※ユーザーが退会したら、その人の過去の食事記録も全自動で一緒に綺麗に消去されます！）
  has_many :meal_records, dependent: :destroy

  # 🔗 ユーザーは「たくさんの体重記録」を持っています
  # （※ユーザーが退会したら、その人の過去の体重記録もデータベース内から全自動で綺麗にお掃除されます！）
  has_many :weight_records, dependent: :destroy
end
