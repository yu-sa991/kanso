# frozen_string_literal: true

# CreateProfiles migration class
class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      # 🔒 null: false をつけることで、空っぽ（未入力）の登録をデータベースの底で絶対に許さない鉄壁のガードになります！
      t.references :user, null: false, foreign_key: true
      t.integer :gender, null: false
      t.integer :age, null: false
      t.float :height, null: false
      t.float :weight, null: false

      t.timestamps
    end
  end
end
