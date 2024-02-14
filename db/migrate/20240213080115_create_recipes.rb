class CreateRecipes < ActiveRecord::Migration[7.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :thumbnail
      t.integer :copy_permission

      t.timestamps
    end
  end
end
