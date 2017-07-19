class AddPostIdToLikecommentposts < ActiveRecord::Migration[5.0]
  def change
    add_reference :likecommentposts, :post, foreign_key: true
  end
end
