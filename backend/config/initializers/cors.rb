# frozen_string_literal: true

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    #  門番のホワイトリスト：手元の localhost と、宇宙の本番用URLの両方からの電波を完璧に許可します！
    origins 'http://localhost:5173', 'https://onrender.com'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
