class StatusSerializer < BaseSerializer
  attributes :id, :statustext, :imagestatuses
  has_one :user
  has_many :imagestatuses
  has_many :commentstatuses

  def commentstatuses
    arr=[]
    object.commentstatuses.each do |item|
      arr<<{id: item.id, user: user_comment_status(item.user), created_at: item.created_at, comment: item.comment}
    end

    arr
  end

  def user_comment_status(param)
    let filter = {}
    param.each do |key, val|
      unless key=="password_digest" && key=="password" & key=="created_at" & key=="updated_at"

      end
      filter[key] = val
    end

    filter
  end
end