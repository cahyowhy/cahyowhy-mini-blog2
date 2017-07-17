class CreatePostcomments < ActiveRecord::Migration[5.0]
  def change
    create_table :postcomments do |t|
      t.references :user, foreign_key: true
      t.references :post, foreign_key: true
      t.text :comment

      t.timestamps
    end
  end
end
