# frozen_string_literal: true

class AddActivityLevelToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :activity_level, :string
  end
end
