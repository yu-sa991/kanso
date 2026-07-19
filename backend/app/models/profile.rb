# frozen_string_literal: true

# Profile model class
class Profile < ApplicationRecord
  #  鎖のつながり：このプロフィールは必ず一人の「User」に所属します
  belongs_to :user

  #  性別の2選択ルール（Enum）：データベースの数字（0, 1）を、プログラム上で「男性」「女性」として扱える魔法の設定です！
  enum :gender, { male: 0, female: 1 }

  #  入力チェック（バリデーション）：空っぽの不正な登録をRailsの砦で完全にブロックします！
  validates :gender, presence: true
  validates :age, presence: true, numericality: { only_integer: true, greater_than: 0 } # 年齢は0より大きい整数のみ！
  validates :height, presence: true, numericality: { greater_than: 0 } # 身長は0より大きい数字のみ！
  validates :weight, presence: true, numericality: { greater_than: 0 } # 体重は0より大きい数字のみ！
end

