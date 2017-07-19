class LikecommentpostSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :commentpost
  has_one :post

  def post 
  	{id: object.post.id, title: object.post.title}
  end

  def commentpost
  	{id: object.commentpost.id}
  end
end
