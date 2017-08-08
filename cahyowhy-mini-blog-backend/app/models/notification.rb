class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :userhasresponse, :class_name => 'User'
  validates_presence_of :link, :message, on: :create
end