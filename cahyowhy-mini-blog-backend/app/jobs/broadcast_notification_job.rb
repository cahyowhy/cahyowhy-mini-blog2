class BroadcastNotificationJob < ApplicationJob
  queue_as :default

  def perform(params)
    chanels=[]
    params.each do |item|
      puts item.message
      chanels << (ActionCable.server.broadcast "notification_channel_#{item.id}", message: item.message)
    end

    ActionCable.server.broadcaster_for chanels
  end
end
