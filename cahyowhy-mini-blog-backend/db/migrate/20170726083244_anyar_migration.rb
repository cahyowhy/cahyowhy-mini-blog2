class AnyarMigration < ActiveRecord::Migration[5.0]
  def change
    remove_column :notifications, :another_user_id
  end
end
