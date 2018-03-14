class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :title
      t.string :location
      t.string :description
      t.time :start_time
      t.time :end_time

      t.timestamps
    end
  end
end
