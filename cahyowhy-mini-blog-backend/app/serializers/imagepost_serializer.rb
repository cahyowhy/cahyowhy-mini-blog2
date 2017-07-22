class ImagepostSerializer < ActiveModel::Serializer
  attributes :id, :imageurl
  has_one :user
  has_one :post

  def post
    {id: object.post.id}
  end
end
