class Status < ApplicationRecord
  belongs_to :user
  has_many :imagestatuses, inverse_of: :status
  accepts_nested_attributes_for :imagestatuses
end
