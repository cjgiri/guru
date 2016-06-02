class CreateLyrics < ActiveRecord::Migration
  def change
    create_table :lyrics do |t|
      t.integer :author_id, null:false
      t.string :title, null:false
      t.string :artist, null:false
      t.string :album
      t.text :content, null:false

      t.timestamps null: false
    end
  end
end
