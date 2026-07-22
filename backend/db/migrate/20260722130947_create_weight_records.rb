# frozen_string_literal: true

# CreateWeightRecords migration class
class CreateWeightRecords < ActiveRecord::Migration[7.1]
  def change
    create_table :weight_records do |t|
      # 🔒 null: false をつけることで、未入力の不正データをデータベースの底で絶対に許しません！
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.float :weight, null: false

      t.timestamps
    end

    # 🛡️ 【今回の最重要防犯！】
    # 「同じユーザー(user_id)が、同じ日付(date)に、2つ以上体重を保存すること」をデータベースの最深部で絶対に許さない複合ユニーク設定です！
    add_index :weight_records, %i[user_id date], unique: true
  end
end
