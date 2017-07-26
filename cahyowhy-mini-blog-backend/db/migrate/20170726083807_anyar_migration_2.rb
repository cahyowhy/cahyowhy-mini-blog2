class AnyarMigration2 < ActiveRecord::Migration[5.0]
  def change
    add_column :notifications, :userhasresponse, :integer
    add_reference :notifications, :userhasresponse, foreign_key: {to_table: :users}
  end
end
