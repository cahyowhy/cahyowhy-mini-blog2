class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name, :imageurl
  # attributes :id, :username, :name, :password_digest, :password
end
