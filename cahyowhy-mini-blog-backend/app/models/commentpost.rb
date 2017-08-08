class Commentpost < ApplicationRecord
  belongs_to :user
  belongs_to :post
  has_many :likecommentposts
  validates_presence_of :comment, on: :create
end
