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

  # =========================================================================
  # 🔒 【ここから追加！】パスワード（has_secure_password）の厳格な防犯テスト
  # =========================================================================

  # ❌ 4. パスワードの打ち間違い（不一致）のテスト
  test 'パスワードとパスワード確認が一致しないユーザーは保存できないこと' do
    # パスワード（password123）と確認用（abc456）をわざとすれ違わせて組み立てます
    user = build(:user, password: 'password123', password_confirmation: 'abc456')

    # 金庫番に「確認用とズレているからダメだよ！」と完璧に弾かれることを自動検証！
    assert_not user.valid?
    assert_includes user.errors[:password_confirmation], "doesn't match Password"
  end

  # ❌ 5. パスワード空っぽ（未入力）のテスト
  test 'パスワードが空っぽ（nil）のユーザーは保存できないこと' do
    user = build(:user, password: nil, password_confirmation: nil)
    assert_not user.valid?
    assert_includes user.errors[:password], "can't be blank"
  end

  # ❌ 6. パスワードが短すぎる（文字数不足）のテスト
  test 'パスワードが短すぎる（6文字未満）ユーザーは保存できないこと' do
    # わざと4文字（abc1）という、危険で短すぎるパスワードで突入させます！
    user = build(:user, password: 'abc1', password_confirmation: 'abc1')

    # 門番が「短すぎて危ないから保存禁止！」とガチッと弾き飛ばすことを自動検証！
    assert_not user.valid?
    assert_includes user.errors[:password], 'is too short (minimum is 6 characters)'
  end
end
