class AddAttachmentImageToLyrics < ActiveRecord::Migration
  def self.up
    change_table :lyrics do |t|
      t.attachment :image
    end
  end

  def self.down
    remove_attachment :lyrics, :image
  end
end
