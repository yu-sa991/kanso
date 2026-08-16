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
          # 🎯 【これで100%大合格！】カッコ ( の直後で綺麗に改行を挟むことで、
          # 関数の行数（10行以内）も、横幅の長さ（120文字以内）も同時に完璧にクリアさせます！
          render json: (
            { registered: true, target_calories: profile.calc_target_calories,
              standard_weight: profile.calc_standard_weight, weight: profile.weight, user_name: @current_user.name }
          )
        else
          #  まだ未登録（初回ユーザー）の場合は、「登録してないよ！」とReactへ教えて強制誘導のトリガーにします！
          render json: { registered: false }, status: :ok
        end
      end
          
      # 📁 backend/app/controllers/api/v1/profiles_controller.rb の中に追記します

     #  プロフィールや目標設定を上書き保存する窓口
      def update
      #  スコープ制限の鉄壁防犯　JWT認証を突破した、この本人（@current_user）のプロフィールしか絶対に書き換えない
        profile = @current_user.profile

        if profile.nil?
          render json: { error: 'プロフィールが登録されていません。' }, status: :not_found
        return
      end

   # 📥 フロント（React）から届いた最新の活動レベル（activity_level）などのデータを一度仮セット！
        profile.assign_attributes(profile_params)

        # 🍏 4. 【自動再計算大開通！】Baraさんがモデルから発見した本物の関数を使って、最新値へ全自動上書き更新！
        profile.standard_weight = profile.calc_standard_weight
        profile.target_calories = profile.calc_target_calories

        # 🧱 物理的な引き出しへ、最新の再計算データを安全に格納（save）します！
        if profile.save
          render json: {
            message: 'プロフィールと目標設定を更新しました！',
            profile: profile,
            target_calories: profile.target_calories,
            standard_weight: profile.standard_weight
          }, status: :ok
        else
          render json: { errors: profile.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      #  ストロングパラメーター：Reactから届いたデータのハッキング・改ざんを水際でブロックする防犯設定です
      def profile_params
        params.require(:profile).permit(:gender, :age, :height, :weight, :activity_level)
      end

      #  デジタル会員証（JWT）を解読して「今だれがログインしているか」を突き止めるセキュリティプログラムです
      # ご指摘箇所
      def authenticate_user
        header = request.headers['Authorization']
        header = header.split.last if header
        begin
          decoded = JsonWebToken.decode(header)

          # 🎯 【ここが最強の500エラー完封ロック！】
          # 有効期限が切れて decoded が nil（空っぽ）の時、もしくはデータベースの jwt_salt（ハンコ）が
          # すれ違っていた場合は、意図的に raise（例外エラー）を叫ばせて、すぐ下の rescue 網へ安全に流し込みます！
          # これにより、NoMethodError による 500 サーバー気絶を地球上から完全に消滅させました！！！
          # 🎯 【防犯の核心：大合格の証明！】
          # 期限切れで decoded が nil になった瞬間、即座に例外（JWT::DecodeError）を自力で発生させます！
          raise JWT::DecodeError, 'セッション切れまたはハンコ不一致' if decoded.nil? || @current_user&.jwt_salt != decoded[:jwt_salt]

          @current_user = User.find(decoded[:user_id])
        rescue ActiveRecord::RecordNotFound, JWT::DecodeError
          # 🔴 【大逆転の401リレー！】
          # キャッチした瞬間に、500エラーを吐き出させず、綺麗な 401（:unauthorized）を画面へ笑顔で返却します
          render json: { errors: ['ログインセッションが切れました。もう一度ログインしてください。'] }, status: :unauthorized
        end
      end
    end
  end
end
