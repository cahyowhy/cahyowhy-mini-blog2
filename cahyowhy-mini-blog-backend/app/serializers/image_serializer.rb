class ImageSerializer < BaseSerializer
  attributes :id, :path
  has_one :user
  has_many :imagestatuses
end
