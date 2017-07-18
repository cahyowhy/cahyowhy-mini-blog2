class NewMigration < ActiveRecord::Migration[5.0]
  def change
  	drop_table :postcommentlikes 
  	drop_table :postcomments
  end
end
