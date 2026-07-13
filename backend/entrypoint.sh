#!/bin/bash
set -e

# Rails特有の「古いサーバーのプロセスID」が残っていたら自動削除する
rm -f /app/tmp/pids/server.pid

# 本来のコマンド（Railsサーバー起動）を実行する
exec "$@"
