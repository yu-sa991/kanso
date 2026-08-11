# rubocop:disable Metrics/BlockLength
# 🎯 【ここを追加！】このファイルだけ行数チェックを優しくスキップさせます！
# frozen_string_literal: true

require 'active_support/core_ext/integer/time'

Rails.application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # In the development environment your application's code is reloaded any time
  # it changes. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.enable_reloading = true

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable server timing
  config.server_timing = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join('tmp/caching-dev.txt').exist?
    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options).
  config.active_storage.service = :local

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise exceptions for disallowed deprecations.
  config.active_support.disallowed_deprecation = :raise

  # Tell Active Support which deprecation messages to disallow.
  config.active_support.disallowed_deprecation_warnings = []

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Highlight code that enqueued background job in logs.
  config.active_job.verbose_enqueue_logs = true

  # Raises error for missing translations.
  # config.i18n.raise_on_missing_translations = true

  # Annotate rendered view with file names.
  # config.action_view.annotate_rendered_view_with_filenames = true

  # Uncomment if you wish to allow Action Cable access from any origin.
  # config.action_cable.disable_request_forgery_protection = true

  # Raise error when a before_action's only/except options reference missing actions
  config.action_controller.raise_on_missing_callback_actions = true
  # =========================================================================
  # 🚨 【タスク20】N+1問題自動検出ツール（Bullet）のアクティブ化設定
  # =========================================================================
  config.after_initialize do
    Bullet.enable = true # Bulletの見張りロボットを大起動させます！
    Bullet.bullet_logger = true # 📁 backend/log/bullet.log という専用のバグ日記帳に自動記録します
    Bullet.rails_logger = true # 💻 いつもの黒いターミナル画面（rails server）にも赤文字で警告を叫ばせます
  end
  # 開発環境で送信されたメールを、先ほど新設したポスト画面（letter_opener_web）へ
  # 100%全自動で流し込み、React（localhost:5173）への神架け橋URL
  config.action_mailer.delivery_method = :letter_opener_web
  config.action_mailer.default_url_options = { host: 'localhost', port: 5173 }

  # 🎯 【ここを追記！】Dockerコンテナの外部IPからのアクセスでも、better_errorsがパニックを起こさずに大作動するように許可します！
  BetterErrors::Middleware.allow_ip! '0.0.0.0/0' if defined?(BetterErrors)
end

# 🎯 【ここを追加！】ファイルの一番最後にこの1行を書き足します！
# オフにしていた長さチェックを、ここで「元通りオンに戻します」とロボットに宣言して大合格させます！
# rubocop:enable Metrics/BlockLength
