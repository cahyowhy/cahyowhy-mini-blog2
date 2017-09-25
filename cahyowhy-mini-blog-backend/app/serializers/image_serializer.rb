class ImageSerializer < BaseSerializer
  attributes :id, :path, :created_at
  has_one :user
end
