class AddRecipeIdToComment < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :recipe_id, :integer
  end
end
