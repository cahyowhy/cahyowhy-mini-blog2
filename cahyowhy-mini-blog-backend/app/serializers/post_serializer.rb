class PostSerializer < BaseSerializer
  attributes :id, :title, :description, :created_at, :category, :review, :descriptiontext, :mark, :image, :total_like
  has_one :user
  has_many :likeposts
  has_many :imageposts

  def likeposts
    arr = []
    object.likeposts.each do |item|
      arr << {id: item.id, user: {id: item.user.id, username: item.user.username}}
    end

    arr
  end

  def image
    object.imageposts[0]==nil ? "" : object.imageposts[0].imageurl
  end

  def mark
    "POST"
  end
end
