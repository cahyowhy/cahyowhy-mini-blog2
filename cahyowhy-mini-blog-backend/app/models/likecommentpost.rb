class Likecommentpost < ApplicationRecord
  belongs_to :user
  belongs_to :commentpost
end
