class LikestatusSerializer < BaseSerializer
  attributes :id, :userlike, :emoticons, :status_id, :user_id

  def status_id
    object.status.id
  end

  def user_id
    object.user.id
  end

  def userlike
    @instance_options[:userlike]
  end
end
