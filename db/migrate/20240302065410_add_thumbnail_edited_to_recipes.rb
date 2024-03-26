class AddThumbnailEditedToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :thumbnail_edited, :string
  end
end
