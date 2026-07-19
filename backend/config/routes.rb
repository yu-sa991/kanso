# frozen_string_literal: true

Rails.application.routes.draw do
  #  バックエンドAPIの通り道を設定します
  namespace :api do
    namespace :v1 do
      #  ユーザー登録・ログイン認証用の専用URL窓口です
      post 'register', to: 'authentications#register'
      post 'login', to: 'authentications#login'

      # プロフィールの保存（create）と確認（show）の通り道を完全開通！
      resource :profile, only: %i[create show]
    end
  end

  #  アプリが元気に動いているかチェックするための生存確認用URLです
  get 'up' => 'rails/health#show', as: :rails_health_check
end
