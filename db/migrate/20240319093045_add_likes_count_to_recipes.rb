class AddLikesCountToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :likescount, :integer, default: 0, null: false
  end
end
