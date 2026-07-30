# 📊 【2026年最新仕様！】必ずファイルの一番最初（1行目）に記述します！
# テストが始まった瞬間にカバレッジ計測ロボット（SimpleCov）を大起動させます！
import_simplecov = false
begin
  require 'simplecov'
  import_simplecov = true
rescue LoadError
  # テスト環境以外ではスキップします
end

if import_simplecov
  SimpleCov.start 'rails' do
    # 🎯 【最新ルールに対応！】警告メッセージの通り、add_filter を skip へと美しく進化させました！
    SimpleCov.skip "/channels/"
    SimpleCov.skip "/mailers/"
  end
end


# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all
    # 🤖 テストコードの中で「create(:user)」と唱えるだけで3Dプリンターが動くようにする魔法の設定です！
    include FactoryBot::Syntax::Methods
    # Add more helper methods to be used by all tests here...
  end
end
