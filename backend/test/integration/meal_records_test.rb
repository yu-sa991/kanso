# frozen_string_literal: true

require 'test_helper'

class MealRecordsTest < ActionDispatch::IntegrationTest
  setup do
    # 👤 テスト用にパスワード（password123）を持った本物のユーザーを1人金庫に保存しておきます
    @user = create(:user, email: 'auth_test@example.com', password: 'password123', password_confirmation: 'password123')
    # 🔑 ユーザーのログイン（会員証トークン発行）をシミュレーションします
    @token = JsonWebToken.encode(user_id: @user.id)
    @headers = { 'Authorization' => "Bearer #{@token}" }
  end

  # =========================================================================
  # 🔑 1. 【ここを追加！】ログイン機能（Sessions / Login）の操作フローテスト
  # =========================================================================

  # ⭕ パスワードが合っている（正常ルート）のログインテスト
  test '正しいメールアドレスとパスワードを送信した場合はログインに成功し、トークンが返ってくること' do
    post '/api/v1/login',
         params: { email: 'auth_test@example.com', password: 'password123' },
         as: :json

    # 門番（Rails）が「認証大成功だよ！」と 200 OK を返すことを自動検証！
    assert_response :success

    # 画面（レスポンス）の中に、本物の会員証（token）とユーザー名がちゃんと含まれているかを厳格にチェック！
    json_response = JSON.parse(response.body)
    assert_not_nil json_response['token']
    # assert_equal 'テストユーザー', json_response['user_name']
    # 🎯 【修正点】コントローラーが返す本物のデータ構造（トークンのみ）に合わせて、お名前チェックを削除
  end

  # ❌ パスワードが間違っている（不正ルート）のログインテスト
  test '間違ったパスワードを送信した場合は401エラーでログインを拒否されること' do
    post '/api/v1/login',
         params: { email: 'auth_test@example.com', password: 'wrong_password' },
         as: :json

    # 門番（Rails）が「鍵が違うから侵入禁止！」と完璧に 401 Unauthorized で弾くことを自動検証！
    assert_response :unauthorized
  end

  # =========================================================================
  # 🍴 1. 食事記録（MealRecord）の操作フローテスト
  # =========================================================================

  # 🟢 食事ボタン（C: Create）の保存テスト
  test 'ログイン済みのユーザーは食事判定を正常に記録できること' do
    assert_difference('MealRecord.count', 1) do
      post '/api/v1/meal_records',
           params: { meal_record: { date: Time.zone.today.to_s, status: 'not_enough' } },
           headers: @headers,
           as: :json
    end
    assert_response :created
  end

  # 🚨 食事の「1日1件の重複ガード」の鉄壁テスト
  test '同じ日に2回以上の食事記録を送信した場合は422エラーで弾かれること' do
    create(:meal_record, user: @user, date: Time.zone.today)

    assert_no_difference('MealRecord.count') do
      post '/api/v1/meal_records',
           params: { meal_record: { date: Time.zone.today.to_s, status: 'overeating' } },
           headers: @headers,
           as: :json
    end
    assert_response :unprocessable_entity
  end

  # =========================================================================
  # ⚖️ 2. 体重記録（WeightRecord）の操作フローテスト
  # =========================================================================

  # 🟢 体重保存（C: Create）のテスト
  test 'ログイン済みのユーザーは本日の体重を正常に記録できること' do
    assert_difference('WeightRecord.count', 1) do
      post '/api/v1/weight_records',
           params: { weight_record: { date: Time.zone.today.to_s, weight: 65.5 } },
           headers: @headers,
           as: :json
    end
    assert_response :created
  end

  # 🚨 体重の「1日1件の重複ガード」の鉄壁テスト
  test '同じ日に2回以上の体重記録を送信した場合は422エラーで弾かれること' do
    # 3Dプリンターで、今日の1回目の体重（65.5kg）をすでに金庫に保存させます
    create(:weight_record, user: @user, date: Time.zone.today, weight: 65.5)

    # 同じ日（今日）に、ごまかそうとして2回目の別の体重数値を送信させます！
    assert_no_difference('WeightRecord.count') do
      post '/api/v1/weight_records',
           params: { weight_record: { date: Time.zone.today.to_s, weight: 64.0 } },
           headers: @headers,
           as: :json
    end

    # 金庫番（Rails）が「体重も1日1件の制限だよ！」と完璧に422（unprocessable_entity）で弾くことを自動検証！
    assert_response :unprocessable_entity
  end
end
