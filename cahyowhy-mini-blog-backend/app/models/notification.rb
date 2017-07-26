class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :userhasresponse, :class_name => 'User'
end