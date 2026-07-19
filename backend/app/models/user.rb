# frozen_string_literal: true

# User model class
class User < ApplicationRecord
  # これだけで生のパスワードを世界一安全な暗号の塊に変形させるRails最強の防犯機能です！
  has_secure_password

  # 【ここを追加！】ユーザーは「1つのプロフィール」を持っています（ユーザーが消えたら、プロフィールも一緒に全自動で消去（dependent: :destroy）されます！）
  has_one :profile, dependent: :destroy
end
