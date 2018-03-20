class CreateEmailers < ActiveRecord::Migration[5.1]
  def change
    create_table :emailers do |t|
      t.string :user
      t.string :event

      t.timestamps
    end
  end
end
