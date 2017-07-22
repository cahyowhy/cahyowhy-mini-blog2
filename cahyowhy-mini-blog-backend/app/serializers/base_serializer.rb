class BaseSerializer < ActiveModel::Serializer
  attributes :httpstatus

  def httpstatus
    @instance_options[:httpstatus]
  end
end