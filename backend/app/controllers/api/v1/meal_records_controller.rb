# frozen_string_literal: true

module Api
  module V1
    class MealRecordsController < ApplicationController
      # 🛡️ セキュリティガード：この窓口に来る人は、必ず「デジタル会員証（JWT）」を持っているログイン済みの人に限ります！
      before_action :authenticate_user

      # 📅 1. 【一覧ゲート】カレンダー画面を開いた瞬間、このユーザーの「過去の全記録」をまとめて送り返します！
      def index
        meal_records = @current_user.meal_records.order(date: :asc)
        render json: meal_records, status: :ok
      end

      # 📥 2. 【保存ゲート】Reactから届いた毎日の食事判定（🟢🟡🔴）をデータベースの底へガチッと保存します！
      def create
        meal_record = @current_user.meal_records.build(meal_record_params)

        if meal_record.save
          render json: { message: '今日の食事を記録しました！', meal_record: meal_record }, status: :created
        else
          render json: { errors: meal_record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      # 🛡️ ストロングパラメーター：Reactから届いたデータの改ざんを水際でブロックする防犯設定です
      def meal_record_params
        params.require(:meal_record).permit(:date, :status)
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
