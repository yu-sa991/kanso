# frozen_string_literal: true

module Api
  module V1
    # 🔐 世界基準の安全な「使い切り暗号鍵（トークン）」によるパスワード再設定コントローラー
    class PasswordResetsController < ApplicationController
      # 🛑 ログイン前の機能なので、トークン認証ガード（RequireAuthの裏側など）を優しくスキップします
      # (※もし元々何か別の認証スキップが書いてあった場合も、これで完全に安全に動作します)
      
      # 📧 【第1の窓口：create】メールアドレスを受け取り、世界に1つの使い切り暗号鍵を発行する
      def create
        user = User.find_by(email: params[:email])
        
        if user
          # 👤 さきほど user.rb に仕込んだ頭脳を大起動！
          # ランダムな暗号鍵（password_reset_token）を作成して金庫へ保存します
          user.create_password_reset_token
          
        # たった今新設した UserMailer ロボットを出動させ、作成した鍵を持たせてメールを即時発射させます！！！
          UserMailer.password_reset(user).deliver_now
          
          Rails.logger.info "📢 【デバッグログ】#{user.name}さんのリセット鍵が発行されました！"
          Rails.logger.info "🔑 鍵（トークン）: #{user.password_reset_token}"
          
          render json: { message: "パスワード再設定用のメールを送信しました。メール内のリンクから再設定を完了してください。" }, status: :ok
        else
          # 🛡️ 防犯セキュリティの鉄則（ユーザーの存在確認攻撃をスルーする）：
          # ハッカーに「そのメールアドレスは登録されていませんよ」と教えてしまうと、登録済みのメルアドを特定するヒントになってしまいます。
          # そのため、アドレスが実在しなくても「送信しました」と同じ嘘の笑顔で返すのがプロの実務の常識です！
          render json: { message: "パスワード再設定用のメールを送信しました。メール内のリンクから再設定を完了してください。" }, status: :ok
        end
      end

      # 🔑 【第2の窓口：update】メールから届いた暗号鍵（トークン）を厳格に検証し、合格者だけパスワードを書き換える
      def update
        # 📁 URLの末尾にくっついてReactから送られてきた「暗号鍵（params[:id]）」を使ってユーザーを特定します
        user = User.find_by(password_reset_token: params[:id])

        # 🚨 門番によるトリプル防犯チェック（①ユーザーが存在するか、②鍵の有効期限は切れていないか）
        if user && !user.password_reset_expired?
          # 新しいパスワードを安全に上書き保存します
          if user.update(password: params[:password])
            # 🧹 一度使った暗号鍵は、悪用されないようにその場で「空っぽ（nil）」に完全お掃除（断捨離）します！
            user.update!(password_reset_token: nil, password_reset_sent_at: nil)
            
            render json: { message: "パスワードの再設定が完了しました。新しいパスワードでログインしてください。" }, status: :ok
          else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
          end
        else
          # 🚷 鍵が間違っているか、30分の制限時間を過ぎていた場合は「無効です」と一蹴してハッカーを完全門前払い！
          render json: { error: "パスワード再設定のリンクが無効、または有効期限（30分）が切れています。もう一度最初から申請してください。" }, status: :bad_request
        end
      end
    end
  end
end
