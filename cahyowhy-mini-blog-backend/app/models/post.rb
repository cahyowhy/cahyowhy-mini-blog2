class Post < ApplicationRecord
  belongs_to :user
  has_many :likeposts
  def next 
  	self.class.where("id > ?", id).first
  end

  def prev 
  	self.class.where("id < ?", id).last
  end

end
