class NotificationSerializer < BaseSerializer
  attributes :id, :link, :message
  has_one :user
  has_one :userhasresponse
end
