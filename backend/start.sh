#!/bin/bash
# 🧱 宇宙のデータベースの底に、全自動で金庫を一撃建築します！
bundle exec rails db:migrate

# 🚀 工事が終わったら、本物の Puma サーバーを本番モードで元気よく起動します！
bundle exec puma -C config/puma.rb
