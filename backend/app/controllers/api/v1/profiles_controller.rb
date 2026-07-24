# frozen_string_literal: true

module Api
  module V1
    class ProfilesController < ApplicationController
      #  セキュリティガード：この窓口に来る人は、必ず「デジタル会員証（JWT）」を持っているログイン済みの人に限ります
      # （※前回のログイン認証で作成した、ユーザーを特定する仕組みをそのまま使い回します）
      before_action :authenticate_user

      #  1. 【保存窓口】Reactから届いた身体データをデータベースの底へガチッと保存
      def create
        #  会員証から特定した「現在のログインユーザー（@current_user）」に紐づくプロフィールを作ります
        profile = @current_user.build_profile(profile_params)

        if profile.save
          render json: { message: 'プロフィールの登録が完了しました！', profile: profile }, status: :created
        else
          render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      #  2. 【確認窓口】Reactの誘導ロボット（RequireAuth）から「この人は初回登録済み？」と聞かれたら優しく返事します！
      #  【確認窓口をアップデート！】Reactへ「登録済みフラグ」と一緒に「計算結果」もプレゼントします！
      def show
        profile = @current_user.profile

        if profile
          #  すでに登録済みの場合は、データをReactへ優しく渡します
          #  登録済みの場合は、お兄ちゃんの脳みそで今すぐ自動計算した数値を添えて React へ送ります！
          # render json: {
          #  registered: true, profile: profile,
          # target_calories: profile.calc_target_calories, standard_weight: profile.calc_standard_weight # 自動計算を呼び出す
          # }, status: :ok
          # 🎯 【本物のお直し！】Baraさんが以前作った最強の自動計算脳みそ（calc_）を呼び出し、Reactが待ち構えている体重（weight）も一緒に完璧に包んで送り返します！
          render json: { registered: true, target_calories: profile.calc_target_calories,
                         standard_weight: profile.calc_standard_weight, weight: profile.weight }
        else
          #  まだ未登録（初回ユーザー）の場合は、「登録してないよ！」とReactへ教えて強制誘導のトリガーにします！
          render json: { registered: false }, status: :ok
        end
      end

      private

      #  ストロングパラメーター：Reactから届いたデータのハッキング・改ざんを水際でブロックする防犯設定です
      def profile_params
        params.require(:profile).permit(:gender, :age, :height, :weight)
      end

      #  デジタル会員証（JWT）を解読して「今だれがログインしているか」を突き止めるセキュリティプログラムです
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
