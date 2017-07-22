class ImageSerializer < BaseSerializer
  attributes :id, :path
  has_one :user
end
