class UpdateLyric < ActiveRecord::Migration
  def change
    rename_column :lyrics, :content, :lyric_body
  end
end
