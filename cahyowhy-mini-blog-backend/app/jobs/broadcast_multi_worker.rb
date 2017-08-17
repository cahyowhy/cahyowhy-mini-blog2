class BroadcastMultiWorker
  include Sidekiq::Worker

  def perform(id, message, link, data, mark)
    ActionCable.server.broadcast "notification_channel_#{id}", {message: message, link: link, data: data, mark: mark}
  end
end