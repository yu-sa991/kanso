# frozen_string_literal: true

# 💂 アプリ全体のすべてのコントローラーの親玉であり、共通の門番（セキュリティ）を司るクラスです
class ApplicationController < ActionController::API
  # 🔑 アプリのすべての部屋（API）を開く前に、必ずこの「authenticate_request（門番チェック）」を実行させます
  before_action :authenticate_request

  # 👤 ログイン中のユーザーの情報を、どこの部屋からでも「@current_user」という名前で安全に呼び出せるようにする技です
  attr_reader :current_user

  private

  # 💂【ここが最強の門番仕事！】届いた会員証が本物か、ハッカーの盗み出した古いものじゃないかを厳格にパトロールします
  def authenticate_request
    # ① ユーザーのスマホ（React）から、ヘッダーに乗せて送られてきた「会員証（トークン）」を優しく抜き出します
    header = request.headers['Authorization']
    token = header.split(' ').last if header.present?

    # ② 抜き出した会員証を、さっき格上げした「JsonWebToken案内所」へ手渡して解読（デコード）させます
    decoded = JsonWebToken.decode(token) if token

    if decoded
      # ③ 解読に成功したら、会員証に書いてある「ユーザーID」を使って、金庫（データベース）から本人のデータを特定します
      user = User.find_by(id: decoded[:user_id])

      # 🚨 【最重要防犯ロック！】
      # 解読した会員証に刻まれているハンコ（decoded[:jwt_salt]）が、
      # 現在のデータベース金庫にある本物のハンコ（user.jwt_salt）と【完全に一致するか】を厳格にチェックします！
      #
      # 💡 もし本人がパスワードを変更していた場合、金庫側のハンコが新しく書き換わっているため、
      # ハッカーが持っている古い会員証のハンコとは一致しなくなり、ここで100%確実にハッキングを検知できます！
      if user && user.jwt_salt == decoded[:jwt_salt]
        # ハンコが100%完全に一致した「正真正銘の本物のユーザー」だけを、笑顔でアプリの部屋（@current_user）へ通します
        @current_user = user
      else
        # 🚷 ハンコがすれ違っていた（不一致だった）場合は、ハッカーと判断して一瞬で完全門前払い（強制ログアウト）を執行します！
        render json: { error: 'セッションの有効期限が切れたか、パスワードが変更されたため再度ログインが必要です。' }, status: :unauthorized
      end
    else
      # 会員証そのものを持っていない、あるいは偽物の場合は「ログインしてください」と冷たく追い返します
      render json: { error: 'ログインしてください。' }, status: :unauthorized
    end
  end
end
