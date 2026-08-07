# frozen_string_literal: true

module Api
  module V1
    class WeightRecordsController < ApplicationController
      # 🛡️ セキュリティガード：この窓口に来る人は、必ず「デジタル会員証（JWT）」を持っているログイン済みの人に限ります！
      before_action :authenticate_user

      # 📊 1. 【一覧ゲート】グラフ画面を開いた瞬間、このユーザーの「過去の全体重記録」をまとめて日付順に送り返します！
      def index
        weight_records = @current_user.weight_records.order(date: :asc)
        # 🎯 送り返すデータを、Reactの「YYYY-MM-DD」の形と1ミリの狂いもなく完全同期させます！
        render json: weight_records.as_json(methods: :date), status: :ok
      end

      # 📥 2. 【保存ゲート】Reactから届いた毎日の体重（kg）をデータベースの底へガチッと保存します！
      def create
        weight_record = @current_user.weight_records.build(weight_record_params)

        if weight_record.save
          render json: { message: '今日の体重を記録しました！', weight_record: weight_record }, status: :created
        else
          render json: { errors: weight_record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      # 🛡️ ストロングパラメーター：Reactから届いたデータの改ざんを水際でブロックする防犯設定です
      def weight_record_params
        params.require(:weight_record).permit(:date, :weight)
      end

      # 🔑 デジタル会員証（JWT）を解読して「今だれがログインしているか」を突き止めるセキュリティプログラムです
      def authenticate_user
        header = request.headers['Authorization']
        header = header.split.last if header
        begin
          decoded = JsonWebToken.decode(header)

          # 🎯 【ここが500エラー完封ロック！】
          # 有効期限が切れて decoded が nil（空っぽ）の時、もしくはデータベースの jwt_salt（ハンコ）が
          # すれ違っていた場合は、意図的に raise（例外エラー）を叫ばせて、すぐ下の rescue 網へ安全に流し込みます！
          # これにより、NoMethodError による 500 サーバー気絶を最初から完全に消滅させました！！！
          raise JWT::DecodeError, 'セッション切れまたはハンコ不一致' if decoded.nil? || @current_user&.jwt_salt != decoded[:jwt_salt]

          @current_user = User.find(decoded[:user_id])
        rescue ActiveRecord::RecordNotFound, JWT::DecodeError
          render json: { errors: ['ログインセッションが切れました。もう一度ログインしてください。'] }, status: :unauthorized
        end
      end
    end
  end
end
