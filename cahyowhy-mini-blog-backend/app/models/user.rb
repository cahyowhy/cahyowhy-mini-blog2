class User < ApplicationRecord
  has_secure_password
  validates :password, :presence => true, :length => {:minimum => 8}, on: :create
  validates_presence_of :username, :name, on: :create
end
