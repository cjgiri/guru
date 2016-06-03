class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.text :body, null:false
      t.integer :author_id, null:false
      t.integer :start_char, null:false
      t.integer :end_char, null:false
      t.integer :lyric_id, null:false

      t.timestamps null: false
    end
  end
end
