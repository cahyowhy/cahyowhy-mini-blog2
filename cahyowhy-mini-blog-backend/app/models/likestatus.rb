class Likestatus < ApplicationRecord
  enum emoticons: [:like, :love, :laugh, :wow, :sad, :anger]
  belongs_to :user
  belongs_to :status

  def self.get_emoticon
    self.emoticons
  end
end
