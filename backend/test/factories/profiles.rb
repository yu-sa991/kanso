# frozen_string_literal: true

FactoryBot.define do
  # 🤖 プロファイルモデル（Profile）のダミー作成用設計図
  factory :profile do
    association :user # 🔗 自動的にUserの設計図とガチッと連動！
    gender { 'male' } # 🎯 【ここを修正！】本物のルールである 'male' に合わせます！
    age { 25 }
    height { 170.0 }
    weight { 65.5 }
    # 🎯 保存する必要のない target_calories と standard_weight の行は綺麗に断捨離しました！
  end
end
