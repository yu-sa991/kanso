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

  # 🍏 1. 【標準体重の自動計算】 BMI 22の最も健康的な体重を割り出します
  def calc_standard_weight
    # 身長は cm で保存されているので、100で割り算して「メートル(m)」に変換してから計算します！
    height_m = height / 100.0
    (height_m * height_m * 22).round(1) # 小数点第2位を四捨五入して、スッキリ「65.2kg」のようにします
  end

  # 🔥 2. 【目標摂取カロリーの自動計算】 ハリス・ベネディクト方程式 ＆ 消費-300kcal
  def calc_target_calories
    # 🕵️ if文による男女の式転換：男性(male)か女性(female)かで基礎代謝の計算式をパチッと切り替えます！
    bmr = if male?
            66.47 + (13.75 * weight) + (5.0 * height) - (6.75 * age)
          else
            655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age)
          end

    # 🎯 基礎代謝量に一般的な活動量（1.5倍）を掛け算し、そこから健康的に痩せるための「-300kcal」を引き算！
    target = (bmr * 1.5) - 300
    target.round # 画面に表示しやすいよう、端数は四捨五入して綺麗な整数（例: 1850kcal）にします！
  end
end

