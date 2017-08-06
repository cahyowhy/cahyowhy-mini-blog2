class BroadcastSingleWorker
  include Sidekiq::Worker

  def perform(id, message, link)
    puts id
    puts message
    ActionCable.server.broadcast "notification_channel_#{id}", {message: message, link: link}
  end
end