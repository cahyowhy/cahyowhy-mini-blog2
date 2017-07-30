class PostSerializer < BaseSerializer
  attributes :id, :title, :description, :created_at, :category, :review, :descriptiontext
  has_one :user
  has_many :likeposts
  has_many :imageposts

  def created_at
    object.created_at.to_s.split(" ")[0]
  end

  def likeposts
    arr = []
    object.likeposts.each do |item|
      arr << {id: item.id, user: {id: item.user.id, username: item.user.username}}
    end

    arr
  end
end
