# == Schema Information
#
# Table name: lyrics
#
#  id                 :integer          not null, primary key
#  author_id          :integer          not null
#  title              :string           not null
#  artist             :string           not null
#  album              :string
#  lyric_body         :text             not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_url          :string
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Lyric < ActiveRecord::Base
  validates :title, :artist, :album, :author_id, :lyric_body, presence: true

  has_attached_file :image, default_url: "record.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :author, class_name:"User", foreign_key:'author_id'

  has_many :annotations

end
