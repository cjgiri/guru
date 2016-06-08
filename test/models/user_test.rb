# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  password_digest :string
#  username        :string           not null
#  session_token   :string           not null
#  email           :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  twitter_uid     :string
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
