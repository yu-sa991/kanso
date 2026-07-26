# frozen_string_literal: true

# Api::V1::AuthenticationsController class
module Api
  module V1
    class AuthenticationsController < ApplicationController
      # 📝 1. 【新規登録】アカウントを作りたい人が来たらここ！
      def register
        user = User.new(user_params)

        if user.save
          token = JsonWebToken.encode(user_id: user.id)
          # render json: { token: token, user: { id: user.id, name: user.name, email: user.email } }, status: :created
          # 🎯 【1行にスリム化！】データを横に綺麗に並べることで、関数の合計を「9行」に抑え込みました！
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
