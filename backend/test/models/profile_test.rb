# frozen_string_literal: true

require 'test_helper'

class ProfileTest < ActiveSupport::TestCase
  # 🤖 1. 【正常ルートのテスト】
  # 登録時に入力する性別・年齢・身長・体重が揃っていれば、100点満点で合格（valid）になるかを検証！
  test '有効なプロファイルは正常に保存できること' do
    user = create(:user)
    # 🎯 【ここを修正！】gender を本物の 'male' に合わせ、余計な項目をスッキリ断捨離しました！
    profile = build(:profile, user: user, gender: 'male', age: 25, height: 170.0, weight: 65.5)
    assert profile.valid?
  end

  # 🤰 2. 【性別の必須チェックテスト】
  test '性別が空っぽ（nil）のプロフィールは保存できないこと' do
    profile = build(:profile, gender: nil)
    assert_not profile.valid?
    assert_includes profile.errors[:gender], "can't be blank"
  end

  # 🎂 3. 【年齢の必須チェックテスト】
  test '年齢が空っぽ（nil）のプロフィールは保存できないこと' do
    profile = build(:profile, age: nil)
    assert_not profile.valid?
    assert_includes profile.errors[:age], "can't be blank"
  end
end
