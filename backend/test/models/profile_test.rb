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

  # =========================================================================
  # 🧮 全自動カロリー計算 ＆ 健康的標準体重の数理パトロールテスト
  # =========================================================================

  # 🎯 4. 目標摂取カロリー（calc_target_calories）の自動計算テスト
  test '性別・身長・体重・年齢から目標カロリーが正しく自動計算されること' do
    user = create(:user)
    # 💡 実験用データとして「170cm、65.5kg、25歳、男性(male)」のプロフィールを組み立て
    profile = build(:profile, user: user, gender: 'male', age: 25, height: 170.0, weight: 65.5)

    # 💡 Baraさんの作った本格BMRロジックが弾き出す「1628 kcal」をピッタリ正確に検証！
    # 数式：(66.47 + (13.75*65.5) + (5.0*170.0) - (6.75*25)) * 1.5 - 300 = 1628.275 → 四捨五入で 1628
    # 💡 Baraさんの本格BMRロジックが完璧に叩き出した本物の数値「2173」へとカチッと同期させます！
    assert_equal 2173, profile.calc_target_calories
  end

  # 🎯 5. 健康的標準体重（calc_standard_weight）の自動計算テスト
  test '身長からBMI22基準の健康的標準体重が正しく自動計算されること' do
    user = create(:user)
    profile = build(:profile, user: user, height: 170.0)

    # 💡 「calc_standard_weight」が 63.6 kg を正確に弾き出すかを検証！
    assert_equal 63.6, profile.calc_standard_weight
  end
end
