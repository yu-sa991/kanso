# frozen_string_literal: true

# Api::V1::AuthenticationsController class
module Api
  module V1
    class AuthenticationsController < ApplicationController
      # 共通の門番（ApplicationController）による会員証チェックを、
      # まだトークンを持っていない「register（新規登録）」と「login（ログイン）」の時だけ【完全にスキップ】させます！
      skip_before_action :authenticate_request, only: %i[register login]

      # 📝 1. 【新規登録】アカウントを作りたい人が来たらここ！
      def register
        user = User.new(user_params)

        if user.save
          # 🎯 【ここをお直し完了！】
          # 会員証を発行する際、新設したハンコ（jwt_salt: user.jwt_salt）も一緒に暗号のなかに混ぜ込みます！
          token = JsonWebToken.encode(user_id: user.id, jwt_salt: user.jwt_salt)
          render json: { token: token, message: 'ユーザー登録が完了しました！', profile_registered: false }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # 🔑 2. 【ログイン】すでにアカウントを持っている人はここ！
      def login
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          token = JsonWebToken.encode(user_id: user.id)
          render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :ok
        else
          render json: { error: 'メールアドレスまたはパスワードが正しくありません' }, status: :unauthorized
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end
    end
  end
end
