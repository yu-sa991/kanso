# frozen_string_literal: true

# User model class
class User < ApplicationRecord
  # これだけで生のパスワードを世界一安全な暗号の塊に変形させるRails最強の防犯機能です！
  has_secure_password
end
