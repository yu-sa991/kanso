# frozen_string_literal: true

class User < ApplicationRecord
  # これだけで生のパスワードを世界一安全な暗号の塊に変形させるRails最強の防犯機能です！
  has_secure_password
end
