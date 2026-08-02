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

  # 重要！】Railsのプログラム層でも「1日1件制限」のチェックを二重にかけます
  # （※同じ日付(date)が、同じユーザー(user_id)の中で重複するのを優しく弾いてReactにメッセージを返します）
  # validates :date, uniqueness: { scope: :user_id, message: 'の食事記録はすでに登録されています。' }
  # 🔒 【重要！】Railsのプログラム層でも「1日1件制限」のチェックを二重にかけます
  validate :date_uniqueness_without_english_prefix

  private

  # 🎯 【ここがプロの裏技！】
  # uniqueness のままだと先頭に「Date」が強制的に入ってしまうため、
  # 独自のチェック関数（カスタムバリデーション）を作り、メッセージの全貌を「日付」から完全に直書きコントロールします！
  def date_uniqueness_without_english_prefix
    return unless MealRecord.where(user_id: user_id, date: date).where.not(id: id).exists?

    # 🔮 【日付自動連動の魔法！】
    # dateデータ(例: 2026-08-02)を「8月2日」という日本語形式に変換
    formatted_date = date.present? ? date.strftime('%m月%d日').gsub(/^0/, '').gsub(' 0', ' ') : '本日'

    # 🎯 箱の名前を :date に戻し、formatted_date を埋め込む
    errors.add(:date, "【#{formatted_date}】の食事記録はすでに登録されています。")
  end
end
