class Post < ApplicationRecord
  belongs_to :user
  has_many :likeposts
  has_many :imageposts, inverse_of: :post
  accepts_nested_attributes_for :imageposts

  def next
    self.class.where("id > ?", id).first
  end

  def prev
    self.class.where("id < ?", id).last
  end
end
