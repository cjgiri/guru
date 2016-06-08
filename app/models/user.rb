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

class User < ActiveRecord::Base

  attr_reader :password

  has_many :lyrics, foreign_key: :author_id
  has_many :annotations, foreign_key: :author_id

  validates :email, :password_digest, presence: true,
    unless: Proc.new{ |user| user.twitter_uid }

  validates :twitter_uid, presence: true, uniqueness: true,
    unless: Proc.new{ |user| user.email }

  validates :email, uniqueness: true, allow_nil: :true

  validates :password, length: {minimum: 6}, allow_nil: :true

  after_initialize :ensure_session_token
  before_validation :ensure_session_token_uniqueness

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(twitter_uid: auth_hash[:uid])

    if user.nil?
      user = User.create!(
      twitter_uid: auth_hash[:uid],
      username: auth_hash[:info][:name]
      )
    end

    user
  end

  def self.find_by_credentials(username, email, password)
    if email
      user = User.find_by(email: email)
    elsif username
      user = User.find_by(username: username)
    end
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

  def reset_session_token!
    self.session_token = new_session_token
    ensure_session_token_uniqueness
    self.save
    self.session_token
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
