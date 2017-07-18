class LikecommentpostSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :commentpost
end
