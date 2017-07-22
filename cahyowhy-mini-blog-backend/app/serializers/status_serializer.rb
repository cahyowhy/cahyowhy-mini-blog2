class StatusSerializer < BaseSerializer
  attributes :id, :statustext, :imagestatuses
  has_one :user
  has_many :imagestatuses
end