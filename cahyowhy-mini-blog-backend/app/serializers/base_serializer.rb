class BaseSerializer < ActiveModel::Serializer
  attributes :httpstatus

  def httpstatus
    @instance_options[:httpstatus]
  end

  def created_at
    object.created_at.strftime("%F %T")
  end


  def attributes(*args)
    excludeparams = @instance_options[:exclude]

    return super unless excludeparams != nil
    filtered = super.except(*excludeparams)
    filtered
  end
end