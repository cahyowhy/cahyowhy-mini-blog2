class UserSerializer < BaseSerializer
  # attributes :id, :username, :name, :password_digest, :password
  attributes :id, :username, :name, :imageurl, :created_at
end
