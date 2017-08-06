class BroadcastSingleWorker
  include Sidekiq::Worker

  def perform(id, message, link)
    ActionCable.server.broadcast "notification_channel_#{id}", {message: message, link: link}
  end
end