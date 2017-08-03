class NotificationChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "notification_channel_#{params[:user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end


=begin
  def speak(data)
    puts data
    #  perform this from client
  end

  def receive(data)
    puts data
    #  perform this from client
  end
=end
end
