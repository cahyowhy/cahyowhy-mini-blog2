class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :category, :image
  has_one :user

  def created_at
    object.created_at.to_s.split(" ")[0]
  end
end
