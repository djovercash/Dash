class CreateEventlists < ActiveRecord::Migration[5.1]
  def change
    create_table :eventlists do |t|
      t.integer :event_id
      t.integer :category_id

      t.timestamps
    end
  end
end
