# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false

      t.timestamps
    end

    # 🛡️ データベースの底で、同じメールアドレスの重複登録を100%完全にブロックする最強のガードです！
    add_index :users, :email, unique: true
  end
end
