class CommentpostSerializer < BaseSerializer
  attributes :id, :comment, :created_at
  has_one :user
  has_one :post
  has_many :likecommentposts

  def post
    {id:object.post.id, title:object.post.title}
  end

  def likecommentposts
    arr = []
    object.likecommentposts.each do |item|
      arr << {id: item.id, user: {id: item.user.id ,username: item.user.username} }
    end

    arr
  end

end
