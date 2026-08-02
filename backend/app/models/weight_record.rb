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
  # validates :date, uniqueness: { scope: :user_id, message: 'の体重記録はすでに登録されています。' }
  # 🎨 【本物のお直し！】RailsがReactへデータを送る際、日付を「YYYY-MM-DD」の形に100%固定して手渡す無敵の翻訳機です！
  # def date
  # read_attribute(:date)&.to_s
  # end
  # 🔒 【重要！】体重側でもRailsのお節介な「先頭Dateドッキング仕様」を完全完封します！
  validate :date_uniqueness_without_english_prefix

  private

  # 🔮 【体重側・日付自動連動の魔法！】
  def date_uniqueness_without_english_prefix
    return unless WeightRecord.where(user_id: user_id, date: date).where.not(id: id).exists?

    # 今日の日付データ(例: 2026-08-02)を、頭の「0」を綺麗に消した「8月2日」という親切な日本語形式に全自動変換します！
    formatted_date = date.present? ? date.strftime('%m月%d日').gsub(/^0/, '').gsub(' 0', ' ') : '本日'

    # 箱の名前を正確に :date に指定しつつ、Baraさん特製の最高に親切な日付連動テキストを金庫から送り返します！
    errors.add(:date, "【#{formatted_date}】の体重記録はすでに登録されています。")
  end
end
