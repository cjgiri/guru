# == Schema Information\
#
# Table name: annotations
#
#  id         :integer          not null, primary key
#  body       :text             not null
#  author_id  :integer          not null
#  start_char :integer          not null
#  end_char   :integer          not null
#  lyric_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Annotation < ActiveRecord::Base
  belongs_to :lyric
  belongs_to :author,  class_name:"User", foreign_key:'author_id'

  validates :body, presence: :true
  validate :does_not_overlap


  def does_not_overlap
    # refactor this horrible line
    if Annotation.where('lyric_id = ?', lyric_id).where.not('(start_char > ? AND end_char > ?) OR (start_char < ? AND end_char < ?)',end_char, end_char, start_char, start_char).any?
      errors.add(:indices, "cannot overlap")
    end
  end

end
