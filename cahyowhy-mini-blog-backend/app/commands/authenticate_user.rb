class AuthenticateUser
  prepend SimpleCommand

  def initialize(username, password, facebook_id=nil)
    @username = username
    @password = password
    @facebook_id = facebook_id
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private
  attr_accessor :username, :password, :facebook_id

  def user
    if facebook_id != nil
      user = User.find_by_facebook_id(facebook_id)
      return user if user
    else
      user = User.find_by_username(username)
      return user if user && user.authenticate(password)
    end

    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end