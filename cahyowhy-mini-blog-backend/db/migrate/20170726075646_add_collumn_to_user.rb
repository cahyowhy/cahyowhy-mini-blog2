class AddCollumnToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :notifications, :another_user_id, :integer
  end
end
