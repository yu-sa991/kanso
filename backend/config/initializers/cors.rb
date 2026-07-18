# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # フロントエンド（React）が動いている localhost:5173 からの電波を100%完全に許可します！
    origins 'http://localhost:5173'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head]
  end
end
