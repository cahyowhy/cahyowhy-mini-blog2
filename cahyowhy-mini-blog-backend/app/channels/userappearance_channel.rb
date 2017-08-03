class UserappearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "userappearance_channel"
  end

  def appear(params)
    ConnectionList.add({id: params['user_id']})
  end

  def unsubscribed
    ConnectionList.remove({id: current_user.id})
  end

  def print_id_users
    puts ConnectionList.all
  end
end
