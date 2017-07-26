class AnyarMigration4 < ActiveRecord::Migration[5.0]
  def change
    remove_column :commentstatuses, :post_id
    add_reference :commentstatuses, :status, foreign_key: {to_table: :statuses}
  end
end
