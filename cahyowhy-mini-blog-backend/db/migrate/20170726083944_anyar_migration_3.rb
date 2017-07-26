class AnyarMigration3 < ActiveRecord::Migration[5.0]
  def change
    remove_column :notifications, :userhasresponse
  end
end
