class NotificationSerializer < BaseSerializer
  attributes :id, :link, :message, :created_at
  has_one :user
  has_one :userhasresponse
end
