class Commentstatus < ApplicationRecord
  belongs_to :user
  belongs_to :status
  validates_presence_of :comment, on: :create
  # using for get only comment status ordered by desc limit 3
  scope :comment_limit_in_status, lambda { order("created_at DESC").limit(9) }
end