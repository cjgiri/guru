# == Schema Information
#
# Table name: lyrics
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  title      :string           not null
#  artist     :string           not null
#  album      :string
#  lyric_body :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class LyricTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
