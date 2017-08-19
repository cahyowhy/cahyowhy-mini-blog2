class CreateLikestatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :likestatuses do |t|
      t.integer :emoticons
      t.references :user, foreign_key: true
      t.references :status, foreign_key: true

      t.timestamps
    end
  end
end
