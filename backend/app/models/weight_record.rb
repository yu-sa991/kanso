# frozen_string_literal: true

# WeightRecord model class
class WeightRecord < ApplicationRecord
  # 🔒 鎖のつながり：この体重記録は必ず一人の「User」に所属します
  belongs_to :user

  # 🛡️ 入力チェック（バリデーション）：空っぽの不正な登録をRailsの砦で完全にブロックします！
  validates :date, presence: true
  validates :weight, presence: true

  # 🔒 【重要！】Railsのプログラム層でも「1日1件制限」のチェックを二重にかけます
  # （※同じ日付(date)が、同じユーザー(user_id)の中で重複するのを優しく弾いてReactにメッセージを返します）
  validates :date, uniqueness: { scope: :user_id, message: 'の体重記録はすでに登録されています。' }
end
