# == Schema Information
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

require 'test_helper'

class AnnotationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
