# frozen_string_literal: true

class AddTargetsToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :standard_weight, :float
    add_column :profiles, :target_calories, :integer
  end
end
