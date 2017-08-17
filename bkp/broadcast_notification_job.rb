class BroadcastNotificationJob < ApplicationJob
  queue_as :default

  def perform(params)
    ActionCable.server.broadcaster_for params
  end
end
