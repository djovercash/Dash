class CreateFriendCategories < ActiveRecord::Migration[5.1]
  def change
    create_table :friend_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
