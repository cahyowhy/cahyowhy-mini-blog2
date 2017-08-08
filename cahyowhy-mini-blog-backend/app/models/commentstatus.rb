class Commentstatus < ApplicationRecord
  belongs_to :user
  belongs_to :status
  validates_presence_of :comment, on: :create
end