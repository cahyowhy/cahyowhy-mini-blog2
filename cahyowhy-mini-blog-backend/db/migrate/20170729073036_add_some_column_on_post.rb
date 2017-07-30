class AddSomeColumnOnPost < ActiveRecord::Migration[5.0]
  def change
    add_column :posts, :review, :string
    add_column :posts, :descriptiontext, :text
    add_column :statuses, :statushtml, :text
  end
end
