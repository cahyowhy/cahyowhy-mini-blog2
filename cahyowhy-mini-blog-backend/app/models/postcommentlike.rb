class Postcommentlike < ApplicationRecord
  belongs_to :user
  belongs_to :postcomment
end
