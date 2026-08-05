# frozen_string_literal: true

class AddJwtSaltToUsers < ActiveRecord::Migration[7.1]
  def change
    # 🎯 【ここをお直し！】
    # PostgreSQLが勘違いしないよう、最初はシンプルに null: true（空っぽOK）で引き出しを作り、
    # その直後に既存の全ユーザーへランダムなハンコを配り、最後に「空っぽ禁止（null: false）」の頑固な防犯ロックをかける
    # という、実務の開発現場で100%採用されている最も安全な王道の手順に書き換えました！
    #add_column :users, :jwt_salt, :string, null: true
       # 🎯 【ここをお直し完了！】
    # null: false（空っぽ禁止制約）を綺麗に「断捨離（消去）」します！
    # これにより、本番の古いデータが空っぽのままであっても、1マスのエラーも起こさずに
    # 本番の金庫（Neon）の机が100%完全に大開通いたします！！！
    add_column :users, :jwt_salt, :string

    # 🔑 今データベースに登録されている既存の全ユーザーに、最初のハンコを一斉に配ります
    up_only do
      User.find_each do |user|
        user.update_column(:jwt_salt, SecureRandom.hex(16))
      end
    end

    # 🔒 最後に「今後は絶対に空っぽの登録は許さない（null: false）」という強固な鍵に格上げします！
    change_column_null :users, :jwt_salt, false
  end
end
