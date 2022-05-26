class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :name
      t.boolean :is_completed

      t.timestamps
    end
  end
end
