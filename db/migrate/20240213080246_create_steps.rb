class CreateSteps < ActiveRecord::Migration[7.0]
  def change
    create_table :steps do |t|
      t.integer :recipe_id
      t.integer :number
      t.string :description

      t.timestamps
    end
  end
end
