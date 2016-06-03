class AddsImageUrlToLyrics < ActiveRecord::Migration
  def change
    add_column :lyrics, :image_url, :string
  end
end
