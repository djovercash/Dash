class CreateInvites < ActiveRecord::Migration[5.1]
  def change
    create_table :invites do |t|
      t.integer :user_id
      t.integer :event_id
      t.boolean :admin, default: false
      t.string :status, default: 'pending'
      t.boolean :host, default: false

      t.timestamps
    end
  end
end
