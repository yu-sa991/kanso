# frozen_string_literal: true

FactoryBot.define do
  factory :weight_record do
    association :user # 🔗 自動的にUser設計図と連動させます！
    date { Time.zone.today }
    weight { 65.5 }
  end
end
