class Imagestatus < ApplicationRecord
  belongs_to :user
  belongs_to :status

  validates_presence_of :imageurl, on: :create
end
