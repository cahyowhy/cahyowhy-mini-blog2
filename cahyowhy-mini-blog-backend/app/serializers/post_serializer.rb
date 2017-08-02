class PostSerializer < BaseSerializer
  attributes :id, :title, :description, :created_at, :category, :review, :descriptiontext
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

  def attributes(*args)
    params = @instance_options[:exclude]
    return super unless params != nil
    filtered = super.except(*params)
    filtered
  end
end
