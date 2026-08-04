# frozen_string_literal: true

Rails.application.routes.draw do
  #  バックエンドAPIの通り道を設定します
  if Rails.env.development?
  # 開発環境（development）の時だけ、ブラウザで「/letter_opener」という住所を叩くと、
  # 送信されたメールを画面上でパッと確認できる、無敵のテスト用ポスト画面を大開通させます！
  # =========================================================================
   mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  end
  
  namespace :api do
    namespace :v1 do
      #  ユーザー登録・ログイン認証用の専用URL窓口です
      post 'register', to: 'authentications#register'
      post 'login', to: 'authentications#login'

      # 🔗 【ここを追加！】ログイン前のパスワード忘れた方向けの再設定ルートを完全開通！
      # post 'password_resets', to: 'password_resets#create'
      # メールアドレスを受け取る窓口(create)と、暗号鍵を検証して上書きする窓口(update)の2つだけを安全に開通させます！
      resources :password_resets, only: %i[create update]

      # プロフィールの保存（create）と確認（show）の通り道を完全開通！
      resource :profile, only: %i[create show]

      # 食事記録の一覧（index）と保存（create）の通り道を完全開通！
      resources :meal_records, only: %i[index create]

      #  体重記録の一覧（index）と保存（create）の通り道を完全開通！
      resources :weight_records, only: %i[index create]
    end
  end

  #  アプリが元気に動いているかチェックするための生存確認用URLです
  get 'up' => 'rails/health#show', as: :rails_health_check
end
