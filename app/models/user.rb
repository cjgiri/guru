# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  password_digest :string           not null
#  username        :string           not null
#  session_token   :string           not null
#  email           :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ActiveRecord::Base

  attr_reader :password

  validates :username, :email, :password_digest, :session_token, presence: true
  validates :username, :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: :true

  after_initialize :ensure_session_token
  before_validation :ensure_session_token_uniqueness

  def self.find_by_username_and_pass(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def self.find_by_email_and_pass(email, password)
    user = User.find_by(email: email)
    return nil unless user && user.valid_password?(password)
    user
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest) == password
  end

  def password=(password)
    @password = password
    self.password_digest=BCrypt::Password.create(password)
  end

  private

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.base64
  end

  def ensure_session_token_uniqueness
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end

end
