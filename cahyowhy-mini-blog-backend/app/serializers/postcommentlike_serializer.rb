class PostcommentlikeSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :postcomment
end
