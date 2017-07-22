class LikepostSerializer < BaseSerializer
  attributes :id
  has_one :user
  has_one :post

  def post
    {id: object.post.id, title: object.post.title}
  end
end
