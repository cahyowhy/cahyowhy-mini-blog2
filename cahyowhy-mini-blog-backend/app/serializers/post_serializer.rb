class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :category, :image
  has_one :user
  has_many :likeposts

  def created_at
    object.created_at.to_s.split(" ")[0]
  end

  def likeposts 
  	arr = []
    object.likeposts.each do |item|
      arr << {id: item.id, user: {id: item.user.id ,username: item.user.username} }
    end

    arr
  end
end
