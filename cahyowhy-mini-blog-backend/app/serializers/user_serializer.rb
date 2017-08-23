class UserSerializer < BaseSerializer
  # attributes :id, :username, :name, :password_digest, :password
  attributes :id, :username, :name, :email, :imageurl, :created_at, :total_follower, :total_following, :facebook_id
end
