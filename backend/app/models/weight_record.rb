# frozen_string_literal: true

# WeightRecord model class
class WeightRecord < ApplicationRecord
  # 🔒 鎖のつながり：この体重記録は必ず一人の「User」に所属します
  belongs_to :user

  # 🛡️ 入力チェック（バリデーション）：空っぽの不正な登録をRailsの砦で完全にブロックします！
  # 🎯 【ここをお直し！】presence: true の後ろに message を追加して、親切な日本語に変身させます！
  validates :date, presence: { message: 'を入力してください。' }
  validates :weight, presence: { message: 'を入力してください。' }

  # 🔒 【重複チェック】Railsのプログラム層でも「1日1件制限」のチェックを二重にかけます
  validates :date, uniqueness: { scope: :user_id, message: 'の体重記録はすでに登録されています。' }
  # 🎨 【本物のお直し！】RailsがReactへデータを送る際、日付を「YYYY-MM-DD」の形に100%固定して手渡す無敵の翻訳機です！
  def date
    read_attribute(:date)&.to_s
  end
end
