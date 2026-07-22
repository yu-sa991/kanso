# frozen_string_literal: true

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 【本物のお直し！】右側の本番URLを、Baraさんの本物のフロントエンド住所（お尻のスラッシュなし）に完璧に修正しました！
    origins 'http://localhost:5173', 'https://kanso-frontend.onrender.com'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
