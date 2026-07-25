# frozen_string_literal: true

module Api
  module V1
    class PasswordResetsController < ApplicationController
      # 🔓 ログイン前の「誰だか分からない状態」から鍵を直すため、この窓口はログインチェック(authenticate_user)をあえて外して誰でも来られるようにします！

      # 🔑 【パスワード上書きゲート】Reactから届いたアドレスと新パスワードを検証して上書きします！
      def create
        # 🕵️‍♂️ 1. 送られてきたメールアドレスを元に、本当に実在するユーザーか金庫から一瞬でシュッと検索！
        user = User.find_by(email: password_reset_params[:email])

        # 🔒 2. ユーザーが見つかった場合、Railsの「has_secure_password」の暗号フィルターを通して、
        # 生のパスワードを自動的に解読不可能な password_digest (ハッシュデータ) に変換して安全に上書き更新（update）します！
        # 🎯 【スリム化！】&.（ぼっち演算子）を使い、ユーザーが存在した時だけ update を走らせる1行に圧縮しました！
        if user&.update(password: password_reset_params[:password],
                        password_confirmation: password_reset_params[:password_confirmation])
          render json: { message: 'パスワードが安全に再設定されました。新しいパスワードでログインしてください！' }, status: :ok
        else
          # 🛡️ ユーザーが見つからない、または文字数エラーの場合のエラー返却（一括仕分け！）
          render json: { errors: user ? user.errors.full_messages : ['指定されたメールアドレスのアカウントが見つかりません。'] },
                 status: user ? :unprocessable_entity : :not_found
        end
      end

      private

      # 🛡️ ストロングパラメーター：Reactから届いたデータの改ざんを水際でブロックする防犯設定です
      def password_reset_params
        params.require(:password_reset).permit(:email, :password, :password_confirmation)
      end
    end
  end
end
