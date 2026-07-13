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

CMD ["rails", "server", "-b", "0.0.0.0"]
