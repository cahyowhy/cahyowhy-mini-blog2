class CommentpostSerializer < ActiveModel::Serializer
  attributes :id, :comment, :created_at
  has_one :user
  has_one :post

  def created_at
    object.created_at.to_s.split(" ")[0]
  end	  

  def post 
  	{id:object.post.id, title:object.post.title}
  end
end
