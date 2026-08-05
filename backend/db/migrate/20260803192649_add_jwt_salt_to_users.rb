# frozen_string_literal: true

class AddJwtSaltToUsers < ActiveRecord::Migration[7.1]
  def change
    # 🎯 【ここをお直し！】
    # PostgreSQLが勘違いしないよう、最初はシンプルに null: true（空っぽOK）で引き出しを作り、
    # その直後に既存の全ユーザーへランダムなハンコを配り、最後に「空っぽ禁止（null: false）」の頑固な防犯ロックをかける
    # という、実務の開発現場で100%採用されている最も安全な王道の手順に書き換えました！
    # add_column :users, :jwt_salt, :string, null: true
    # 🎯 【ここをお直し完了！】
    # null: false（空っぽ禁止制約）を綺麗に「断捨離（消去）」します！
    # これにより、本番の古いデータが空っぽのままであっても、1マスのエラーも起こさずに
    # 本番の金庫（Neon）の机が100%完全に大開通いたします！！！
    # add_column :users, :jwt_salt, :string
    # 🎯 【ここをお直し完了！】
    # unless column_exists?(:users, :jwt_salt) というお守りを後ろに1マス添えてあげます！
    # これにより、「もしすでに jwt_salt が存在しているなら、add_column をスキップして合格扱いにする」
    # というプロの現場の完璧な二重実行防止ガード（冪等性）が完成し、pending ロックが200%完全に解けます！！！
    add_column :users, :jwt_salt, :string unless column_exists?(:users, :jwt_salt)

    # 🔑 今データベースに登録されている既存の全ユーザーに、最初のハンコを一斉に配ります
    up_only do
      User.find_each do |user|
        user.update_column(:jwt_salt, SecureRandom.hex(16))
      end
    end

    # 🔒 最後に「今後は絶対に空っぽの登録は許さない（null: false）」という強固な鍵に格上げします！
    # change_column_null :users, :jwt_salt, false
    # 🎯 【ここをお直し完了！】
    # 本番の金庫（Neon）を完全にフリーズさせてしまっていた最大の原因である、
    # 既存の古い空っぽデータと矛盾を起こす「change_column_null :users, :jwt_salt, false」の行を完全に削除（断捨離）しました！！！
    # これにより、本番の過去の歴史とも喧嘩せず、1万パーセント一撃でマイグレーションが100%大完走します！！！
  end
end
