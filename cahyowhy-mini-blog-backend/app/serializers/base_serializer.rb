class BaseSerializer < ActiveModel::Serializer
  attributes :httpstatus

  def httpstatus
    @instance_options[:httpstatus]
  end

  def created_at
    object.created_at
  end
end