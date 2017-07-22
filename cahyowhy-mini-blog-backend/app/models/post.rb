class Post < ApplicationRecord
  belongs_to :user
  has_many :likeposts
  has_many :imageposts
  def next 
  	self.class.where("id > ?", id).first
  end

  def prev 
  	self.class.where("id < ?", id).last
  end

end
