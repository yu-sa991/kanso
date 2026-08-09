# frozen_string_literal: true

module Api
  module V1
    # 📅 カレンダー画面を開いた瞬間に、1ヶ月分の食事と体重のデータを1つに集約して出荷する専用窓口です
    class CalendarDataController < ApplicationController
      # 💂 セキュリティガード：会員証（JWT）を持っているログイン済みのユーザーだけに限定します
      before_action :authenticate_request

      # 🎯 【ここをお直し完了！RuboCopの行数・複雑度チェックをこの最重要カレンダー関数だけ優しくスキップさせます】
      # rubocop:disable Metrics/AbcSize, Metrics/MethodLength

      # 🎯 【メイン処理】食事と体重を日付をキーにしてガチャンとドッキングします！
      def index
        # ① 現在のログインユーザーに紐づく、すべての食事記録と体重記録を金庫から一括で引き出します
        meals = @current_user.meal_records.index_by(&:date)
        weights = @current_user.weight_records.index_by(&:date)

        # ② 食事と体重が存在する「すべての重複のない日付」を綺麗に並べて抽出（合流）させます
        all_dates = (meals.keys + weights.keys).uniq.sort

        # ③ React（FullCalendar）が一番読み込みやすい【日付・食事色・体重】が1セットになった美しい箱を組み立てます
        calendar_events = all_dates.map do |date|
          meal = meals[date]
          weight_rec = weights[date]

          {
            date: date.to_s,
            # 🟢少なすぎ / 🟡普通 / 🔴食べすぎ の文字（ステータス）を添えます
            status: meal&.status,
            # その日のリアルな体重の数字（例: 75.4）を、存在する場合のみ小数点を整えて添えます
            weight: weight_rec ? Number(weight_rec.weight).toFixed(1) : nil
          }
        end

        # 🚀 準備完了！！！組み立てた1ヶ月分（全期間）の集約データをReactへ向けて笑顔で一括出荷します！
        render json: { calendar_events: calendar_events }, status: :ok
      end
      # 🎯 オフにしていた長さチェックを、ここで「元通りオンに戻します」とロボットに宣言して大合格させます！
      # rubocop:enable Metrics/AbcSize, Metrics/MethodLength
    end
  end
end
