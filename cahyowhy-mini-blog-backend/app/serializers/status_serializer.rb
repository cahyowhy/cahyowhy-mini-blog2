class StatusSerializer < BaseSerializer
  attributes :id, :statustext, :statushtml, :imagestatuses, :created_at, :mark
  has_one :user
  has_many :imagestatuses
  has_many :commentstatuses

  def mark
    "STATUS"
  end

  def commentstatuses
    arr=[]
    object.commentstatuses.each do |item|
      arr<<{id: item.id, user: {id: item.user.id, imageurl: item.user.imageurl, username: item.user.username}, created_at: item.created_at, comment: item.comment}
    end

    arr
  end
end