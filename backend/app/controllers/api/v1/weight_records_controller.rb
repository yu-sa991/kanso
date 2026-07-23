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
          @current_user = User.find(decoded[:user_id])
        rescue ActiveRecord::RecordNotFound, JWT::DecodeError
          render json: { errors: ['ログインセッションが切れました。もう一度ログインしてください。'] }, status: :unauthorized
        end
      end
    end
  end
end
