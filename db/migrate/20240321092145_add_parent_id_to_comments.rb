class AddParentIdToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :parent_id, :integer, index: true
    add_foreign_key :comments, :comments, column: :parent_id
  end
end
