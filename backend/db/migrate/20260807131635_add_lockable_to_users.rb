# frozen_string_literal: true

class AddLockableToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :failed_attempts, :integer
    add_column :users, :locked_at, :datetime
  end
end
