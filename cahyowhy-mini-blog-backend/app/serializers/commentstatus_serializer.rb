class CommentstatusSerializer < ActiveModel::Serializer
  attributes :id, :comment, :created_at
  has_one :user
  has_one :status

  def status
    {id: object.post.id, title: object.post.title}
  end
end
