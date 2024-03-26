class AddIntroduceToRecipes < ActiveRecord::Migration[7.0]
  def change
    add_column :recipes, :introduce, :text
  end
end
