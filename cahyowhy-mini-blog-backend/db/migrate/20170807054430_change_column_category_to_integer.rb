class ChangeColumnCategoryToInteger < ActiveRecord::Migration[5.0]
  def change
    change_column :posts, :category, 'integer USING CAST(category AS integer)'
  end
end
