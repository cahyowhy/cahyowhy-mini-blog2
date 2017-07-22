class CreateImagestatuses < ActiveRecord::Migration[5.0]
  def change
    create_table :imagestatuses do |t|
      t.references :user, foreign_key: true
      t.references :status, foreign_key: true
      t.string :imageurl

      t.timestamps
    end
  end
end
