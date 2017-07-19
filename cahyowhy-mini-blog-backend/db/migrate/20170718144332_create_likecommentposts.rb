class CreateLikecommentposts < ActiveRecord::Migration[5.0]
  def change
    create_table :likecommentposts do |t|
      t.references :user, foreign_key: true
      t.references :commentpost, foreign_key: true
      t.references :post, foreign_key: true

      t.timestamps
    end
  end
end
