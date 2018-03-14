class CreateFriendlists < ActiveRecord::Migration[5.1]
  def change
    create_table :friendlists do |t|
      t.integer :friendship_id
      t.integer :friend_category_id

      t.timestamps
    end
  end
end
