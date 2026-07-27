# frozen_string_literal: true

FactoryBot.define do
  # 🤖 ユーザーモデル（User）のダミー作成用設計図
  factory :user do
    name { 'テストユーザー' }
    email { 'test_user@example.com' }
    password { 'password123' }
    password_confirmation { 'password123' }
  end
end
