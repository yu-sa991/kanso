# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # 🤖 1. 【正常ルートのテスト】
  # FactoryBotで作った標準のダミー人間は、最初から100点満点で合格（valid）になるかを検証します！
  test '有効なファクトリを持つユーザーは正常に保存できること' do
    user = build(:user)
    assert user.valid?
  end

  # 👤 2. 【名前の必須チェックテスト】
  test '名前が空っぽ（nil）のユーザーは保存できないこと' do
    user = build(:user, name: nil)
    assert_not user.valid?
    # 🎯 【言葉の壁を解消！】Railsが英語で吐き出す "can't be blank" を完璧にキャッチします！
    assert_includes user.errors[:name], "can't be blank"
  end

  # 📧 3. 【メールアドレスのユニーク制約テスト】
  test 'すでに登録されているメールアドレスでは二重登録できないこと' do
    create(:user, email: 'test_user@example.com')
    duplicate_user = build(:user, email: 'test_user@example.com')
    assert_not duplicate_user.valid?
    # 🎯 【言葉の壁を解消！】Railsが英語で吐き出す "has already been taken" を完璧にキャッチします！
    assert_includes duplicate_user.errors[:email], 'has already been taken'
  end
end
