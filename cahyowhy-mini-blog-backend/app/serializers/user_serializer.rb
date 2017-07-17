class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :name
  # attributes :id, :username, :name, :password_digest, :password
end
