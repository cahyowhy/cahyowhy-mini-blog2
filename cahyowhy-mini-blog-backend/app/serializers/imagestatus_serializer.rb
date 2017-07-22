class ImagestatusSerializer < ActiveModel::Serializer
  attributes :id, :imageurl
  has_one :user
  has_one :status

  def status
    {id:object.status.id}
  end
end
