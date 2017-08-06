class Status < ApplicationRecord
  include Searchable
  setting_index([{attr: :statustext, type: :text}])

  belongs_to :user
  has_many :imagestatuses, inverse_of: :status
  has_many :commentstatuses
  accepts_nested_attributes_for :imagestatuses
  validates_presence_of :status, :statustext, on: :create

  def self.search(query)
    __elasticsearch__.search(
        {
            query: {
                match: {
                    statustext: query
                }
            },
            suggest: {
                text: query,
                statustext: {
                    term: {
                        size: 1,
                        field: :statustext
                    }
                }
            }
        }
    )
  end

  def as_indexed_json(options = nil)
    self.as_json(only: [:statustext])
  end
end

Post.import force: true