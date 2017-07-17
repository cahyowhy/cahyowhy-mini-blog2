class ImageSerializer < ActiveModel::Serializer
  attributes :id, :path
  has_one :user
end
