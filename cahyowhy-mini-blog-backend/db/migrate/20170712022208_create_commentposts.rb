class CreateCommentposts < ActiveRecord::Migration[5.0]
  def change
    create_table :commentposts do |t|
      t.text :comment
      t.references :user, foreign_key: true
      t.references :post, foreign_key: true

      t.timestamps
    end
  end
end
