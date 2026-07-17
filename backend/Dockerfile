# 2026年現在、Rails7で最も安定しているRuby 3.2系を使用
FROM ruby:3.2.3

# 必要なパッケージ（PostgreSQLのクライアントなど）をインストール
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# コンテナ内の作業ディレクトリを指定
WORKDIR /app

# パソコン側のGemfileをコンテナ内にコピーしてインストールする準備
COPY Gemfile Gemfile.lock /app/
RUN bundle install

COPY . /app

# サーバー起動用のスクリプト（おまじない）
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3000

# CMD ["rails", "server", "-b", "0.0.0.0"]
# 【本番用】起動する直前に、インターネット上の金庫（データベース）を自動作成して立ち上げる無敵のコマンドです！
CMD ["sh", "-c", "bundle exec rails db:create db:migrate && exec rails server -b 0.0.0.0"]
# 【CI環境完全対応】コンテナを組み立てる段階で、RuboCopやRSpecに必要なソフトをすべて確実に内部に焼き付けます！
RUN bundle install
