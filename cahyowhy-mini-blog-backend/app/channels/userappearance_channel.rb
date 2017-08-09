class UserappearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "userappearance_channel"
  end

  def appear(params)
    ConnectionList.add({id: params['user_id'].to_s})
    puts ConnectionList.all
  end

  def unsubscribed
    ConnectionList.remove({id: current_user.id})
    puts ConnectionList.all
  end
end
