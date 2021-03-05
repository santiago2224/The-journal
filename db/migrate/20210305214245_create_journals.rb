class CreateJournals < ActiveRecord::Migration[6.1]
  def change
    create_table :journals do |t|
      t.integer :date
      t.string :title
      t.text :entry

      t.timestamps
    end
  end
end
