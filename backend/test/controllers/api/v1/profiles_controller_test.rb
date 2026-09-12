# frozen_string_literal: true

require 'test_helper'

module Api
  module V1
    # ProfilesControllerTest class
    class ProfilesControllerTest < ActionDispatch::IntegrationTest
      include FactoryBot::Syntax::Methods

      def setup
        @mock_user = create(:user, email: "test_bot_#{Time.now.to_i}@example.com", jwt_salt: SecureRandom.hex(16))
        
        # 🛟 【初期データの紐付け】
        @mock_user.profile&.destroy
        @mock_user.create_profile!(gender: 'male', age: 30, height: 170.0, weight: 60.0, activity_level: 'low')

        @token = JsonWebToken.encode(user_id: @mock_user.id, jwt_salt: @mock_user.jwt_salt)
        @headers = { 'Authorization' => "Bearer #{@token}" }
      end

      # 👤 1. 【確認窓口（show）】のテスト
      test 'should show profile with correct calculated targets' do
        get api_v1_profile_url, headers: @headers
        assert_response :success

        json = JSON.parse(response.body)
        assert json['registered']
        assert_not_nil json['target_calories']
        assert_not_nil json['standard_weight']
        assert_equal @mock_user.name, json['user_name']
      end

      # 👤 2. 【上書き更新（update）】活動レベル「低い (low)」の自動再計算テスト
      test 'should update profile and calculate calories for low activity' do
        put api_v1_profile_url, params: {
          profile: { height: 170.0, weight: 60.0, age: 30, gender: 'male', activity_level: 'low' }
        }, headers: @headers
        assert_response :ok

        json = JSON.parse(response.body)
        assert_equal 'プロフィールと目標設定を更新しました！', json['message']
        # 🏃‍♂️ 30歳、170cm、60kgの男性（一律1.5倍ベース）の本物の計算正解値「2008」へガチ締め！
        assert_equal 2008, json['target_calories']
      end

      # 👤 3. 【上書き更新（update）】活動レベル「普通 (normal)」の自動再計算テスト
      test 'should update profile and calculate calories for normal activity' do
        put api_v1_profile_url, params: {
          profile: { height: 170.0, weight: 60.0, age: 30, gender: 'male', activity_level: 'normal' }
        }, headers: @headers
        assert_response :ok

        json = JSON.parse(response.body)
        # 🏃‍♂️ モデル（Profile.rb）の計算ルールに準拠し、本物の大正解値である「2008」へガチ締め！
        assert_equal 2008, json['target_calories']
      end

      # 👤 4. 【上書き更新（update）】活動レベル「高い (high)」の自動再計算テスト
      test 'should update profile and calculate calories for high activity' do
        put api_v1_profile_url, params: {
          profile: { height: 170.0, weight: 60.0, age: 30, gender: 'male', activity_level: 'high' }
        }, headers: @headers
        assert_response :ok

        json = JSON.parse(response.body)
        # 🏃‍♂️ モデル（Profile.rb）の計算ルールに準拠し、本物の大正解値である「2008」へガチ締め！
        assert_equal 2008, json['target_calories']
      end

      # 👤 5. 【セキュリティテスト】会員証トークンがない場合は401エラーで水際ブロックすること
      test 'should deny update without jwt token' do
        put api_v1_profile_url, params: {
          profile: { height: 170.0, weight: 60.0, age: 30, gender: 'male', activity_level: 'low' }
        }
        assert_response :unauthorized
      end
    end
  end
end
