class Status < ApplicationRecord
  belongs_to :user
  has_many :imagestatuses
end
