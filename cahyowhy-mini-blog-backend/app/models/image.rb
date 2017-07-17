class Image < ApplicationRecord
  belongs_to :user
  attr_accessor :imagepath_data
  serialize :path, JSON
  mount_uploader :path, ImageUploader
end
