class DropTableLikecommentposts < ActiveRecord::Migration[5.0]
  def change
  	drop_table :likecommentposts
  end
end
