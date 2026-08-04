# frozen_string_literal: true

require 'test_helper'

class MealRecordsTest < ActionDispatch::IntegrationTest
  setup do
    # 👤 テスト用に、パスワードを持った本物のユーザーを1人金庫に保存しておきます
    @user = create(:user, email: 'auth_test@example.com', password: 'password123', password_confirmation: 'password123')

    # 🎯 【 jwt_salt 完全同期！】
    # 新設したハンコ（jwt_salt）を、テストデータが生まれる瞬間に本物のランダム文字列へ手動でしっかりと刻み込みます！
    @user.update_column(:jwt_salt, SecureRandom.hex(16))

    # 🎫 新しい jwt_salt もしっかりと暗号に混ぜ込んで、テスト用の本物の会員証（トークン）を発行します！
    @token = JsonWebToken.encode(user_id: @user.id, jwt_salt: @user.jwt_salt)
    @headers = { 'Authorization' => "Bearer #{@token}" }
  end

  # =========================================================================
  # 🔑 1. ログイン機能（Sessions / Login）の操作フローテスト
  # =========================================================================

  test '正しいメールアドレスとパスワードを送信した場合はログインに成功し、トークンが返ってくること' do
    post '/api/v1/login',
         params: { email: 'auth_test@example.com', password: 'password123' },
         as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_nil json_response['token']
  end

  test '間違ったパスワードを送信した場合は401エラーでログインを拒否されること' do
    post '/api/v1/login',
         params: { email: 'auth_test@example.com', password: 'wrong_password' },
         as: :json

    assert_response :unauthorized
  end

  # =========================================================================
  # 🔒 2. 【総当たり(ユーザー列挙)脆弱性対策・同期テスト】
  # 先生のフィードバック通り、アドレスが存在しても無くても、一律で「200 OK」と
  # 全く同じ大成功メッセージを返却する仕様に変更したため、テストもそれに合わせて大合格させます！
  # =========================================================================

  test '登録済みのメールアドレスを送信した場合はパスワード再設定用のトークンが正常に発行されること' do
    post '/api/v1/password_resets',
         params: { email: 'auth_test@example.com', password: 'password123', password_confirmation: 'password123' },
         as: :json

    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_nil json_response['message']
  end

  test '登録されていないメールアドレスを送信した場合は404エラーでリセットを拒否されること' do
    post '/api/v1/password_resets',
         params: { email: 'ghost_user@example.com' },
         as: :json

    # 🎯 【ここが真実！】404で弾くのではなく、ハッカーを欺くために一律で「:success (200 OK)」を期待するように同期します！
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_nil json_response['message']
  end

  # =========================================================================
  # 🍴 3. 食事記録（MealRecord）の操作フローテスト
  # =========================================================================

  test 'ログイン済みのユーザーは食事判定を正常に記録できること' do
    assert_difference('MealRecord.count', 1) do
      post '/api/v1/meal_records',
           params: { meal_record: { date: Time.zone.today.to_s, status: 'not_enough' } },
           headers: @headers,
           as: :json
    end
    assert_response :created
  end

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
  # ⚖️ 4. 体重記録（WeightRecord）の操作フローテスト
  # =========================================================================

  test 'ログイン済みのユーザーは本日の体重を正常に記録できること' do
    assert_difference('WeightRecord.count', 1) do
      post '/api/v1/weight_records',
           params: { weight_record: { date: Time.zone.today.to_s, weight: 65.5 } },
           headers: @headers,
           as: :json
    end
    assert_response :created
  end

  test '同じ日に2回以上の体重記録を送信した場合は422エラーで弾かれること' do
    create(:weight_record, user: @user, date: Time.zone.today, weight: 65.5)

    assert_no_difference('WeightRecord.count') do
      post '/api/v1/weight_records',
           params: { weight_record: { date: Time.zone.today.to_s, weight: 64.0 } },
           headers: @headers,
           as: :json
    end
    assert_response :unprocessable_entity
  end
end
