class StatusSerializer < BaseSerializer
  attributes :id, :statustext, :statushtml, :imagestatuses, :created_at, :mark
  has_one :user
  has_many :imagestatuses
  has_many :commentstatuses
  has_many :likestatuses

  def mark
    "STATUS"
  end

  def commentstatuses
    entities=[]
    object.commentstatuses.comment_limit_in_status.each do |item|
      entities<<{id: item.id, user: {id: item.user.id, imageurl: item.user.imageurl, username: item.user.username}, created_at: item.created_at, comment: item.comment}
    end
    entities
  end
end