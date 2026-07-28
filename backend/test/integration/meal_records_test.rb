# frozen_string_literal: true

require 'test_helper'

class MealRecordsTest < ActionDispatch::IntegrationTest
  setup do
    @user = create(:user)
    # 🔑 ユーザーのログイン（会員証トークン発行）をシミュレーションします
    @token = JsonWebToken.encode(user_id: @user.id)
    @headers = { 'Authorization' => "Bearer #{@token}" }
  end

  # 🟢 1. 食事ボタン（C: Create）の操作フローテスト
  test 'ログイン済みのユーザーは食事判定を正常に記録できること' do
    assert_difference('MealRecord.count', 1) do
      post '/api/v1/meal_records',
           params: { meal_record: { date: Time.zone.today.to_s, status: 'not_enough' } },
           headers: @headers,
           as: :json
    end
    assert_response :created
  end

  # 🚨 2. 自分への甘えを許さない「1日1件の重複ガード」の鉄壁フローテスト
  test '同じ日に2回以上の食事記録を送信した場合は422エラーで弾かれること' do
    # 1回目のボタン押下（これは正常に金庫に保存されます）
    create(:meal_record, user: @user, date: Time.zone.today)

    # 同じ日（今日）に、自分に甘えて2回目のボタンを押し込んだと仮定して突入させます！
    assert_no_difference('MealRecord.count') do
      post '/api/v1/meal_records',
           params: { meal_record: { date: Time.zone.today.to_s, status: 'overeating' } },
           headers: @headers,
           as: :json
    end

    # 金庫番（Rails）が「1日1件制限だよ！」と完璧に422（unprocessable_entity）で弾くことを自動検証！
    assert_response :unprocessable_entity
  end
end
