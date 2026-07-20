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

  # 🍏 1. 【標準体重の自動計算】
  def calc_standard_weight
    height_m = height / 100.0
    (height_m * height_m * 22).round(1)
  end

  # 🔥 2. 【目標摂取カロリーの自動計算】（※複雑度を抑えるため、基礎代謝の計算を別部屋へパスします！）
  def calc_target_calories
    bmr = male? ? bmr_for_male : bmr_for_female
    target = (bmr * 1.5) - 300
    target.round
  end

  private

  # 🙋‍♂️ 男性の基礎代謝（BMR）を計算する専門の小部屋
  def bmr_for_male
    66.47 + (13.75 * weight) + (5.0 * height) - (6.75 * age)
  end

  # 🙋‍♀️ 女性の基礎代謝（BMR）を計算する専門の小部屋
  def bmr_for_female
    655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age)
  end
end
