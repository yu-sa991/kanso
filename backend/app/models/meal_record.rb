# frozen_string_literal: true

# MealRecord model class
class MealRecord < ApplicationRecord
  # 🔒 鎖のつながり：この食事記録は必ず一人の「User」に所属します
  belongs_to :user

  # 🎨 食事判定の3ステータス（Enum）：
  # お掃除ロボットに怒られないスマートな英語で「抜きすぎ」「普通」「食べすぎ」を定義します！
  enum :status, { not_enough: 0, normal: 1, overeating: 2 }

  # 🛡️ 入力チェック（バリデーション）：空っぽの不正な登録をRailsの砦で完全にブロックします！
  validates :date, presence: true
  validates :status, presence: true

  # 🔒 【重要！】Railsのプログラム層でも「1日1件制限」のチェックを二重にかけます
  # （※同じ日付(date)が、同じユーザー(user_id)の中で重複するのを優しく弾いてReactにメッセージを返します）
  validates :date, uniqueness: { scope: :user_id, message: 'の食事記録はすでに登録されています。' }
end

