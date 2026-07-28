# frozen_string_literal: true

require 'test_helper'

class SecurityMealRecordsTest < ActionDispatch::IntegrationTest
  setup do
    # 👤 1. 本物の被害者ユーザー（Baraさん）
    @victim_user = create(:user, email: 'bara@example.com')
    # 🍴 被害者ユーザーが登録した、大切な本物の食事記録データ
    @victim_meal = create(:meal_record, user: @victim_user, date: Time.zone.today, status: 'normal')

    # 🥷 2. 悪意ある侵入者ユーザー（ハッカー）
    @hacker_user = create(:user, email: 'hacker@example.com')
    # 🔑 侵入者の会員証トークンを発行します
    @hacker_token = JsonWebToken.encode(user_id: @hacker_user.id)
    @hacker_headers = { 'Authorization' => "Bearer #{@hacker_token}" }
  end

  # =========================================================================
  # 🔒 【防犯の極み】存在しない窓口（Update / Delete）への侵入完全門前払いテスト
  # =========================================================================

  # ❌ ① 他人の食事記録を勝手に書き換え（Update）ようとした場合のブロックテスト
  test '他人のトークンを使って存在しない更新ゲートを叩いた場合は404で完璧に門前払いされること' do
    # 🥷 侵入者が、被害者の食事IDに対して勝手に書き換え（patch）リクエストを送信！
    patch "/api/v1/meal_records/#{@victim_meal.id}",
          params: { meal_record: { status: 'overeating' } },
          headers: @hacker_headers,
          as: :json

    # 🎯 アプリに更新窓口自体が存在しないため、完璧に 404 (Not Found) で叩き落とされることを自動検証！
    assert_equal 404, response.status
  end

  # ❌ ② 他人の食事記録を勝手にデリート（Delete）しようとした場合のブロックテスト
  test '他人のトークンを使って存在しない削除ゲートを叩いた場合は404で完璧に門前払いされること' do
    # 🥷 侵入者が、被害者の食事IDを勝手に消去（delete）しようと突入！
    assert_no_difference('MealRecord.count') do
      delete "/api/v1/meal_records/#{@victim_meal.id}",
             headers: @hacker_headers,
             as: :json
    end

    # 🎯 アプリに削除窓口自体が存在しないため、完璧に 404 (Not Found) で門前払いされたことを自動検証！
    assert_equal 404, response.status
  end
end
