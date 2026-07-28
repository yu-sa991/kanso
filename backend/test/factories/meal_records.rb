# frozen_string_literal: true

FactoryBot.define do
  factory :meal_record do
    association :user # 🔗 自動的に上記のUser設計図とガチッと連動させます！
    date { Time.zone.today }
    status { 'normal' } # 🟡 標準は「普通・腹八分目」
  end
end
