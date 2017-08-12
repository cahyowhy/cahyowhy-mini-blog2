class Post < ApplicationRecord
  include Searchable
  setting_index([{attr: :title, type: :string}, {attr: :category, type: :string}, {attr: :total_like, type: :integer}, {attr: :review, type: :string}])

  enum category: [:sains, :komedi, :sejarah, :gosip, :kisah, :puisi, :pribadi, :mistis, :berita]
  belongs_to :user
  has_many :likeposts, dependent: :destroy
  has_many :commentposts, dependent: :destroy
  has_many :imageposts, inverse_of: :post, dependent: :destroy
  validates_presence_of :title, :description, :category, :review, :descriptiontext, on: :create
  accepts_nested_attributes_for :imageposts

  def total_like
    self.likeposts.count
  end

  def self.sort_by_like
    __elasticsearch__.search(
        {sort: [{total_like: {order: "desc"}}]}
    )
  end

  # Post.all.order("created_at DESC").offset(0).limit(9).sort_by(&:total_like)
  def self.search(query)
    __elasticsearch__.search(
        {
            query: {
                multi_match: {
                    query: query,
                    fields: ['title^10', 'category^9', 'review'] #the ^5 is indicating that username fields is importance5x thane name
                }
            },
            sort: [
                {total_like: {order: "desc"}}
            ],
            suggest: {
                text: query,
                title: {
                    term: {
                        size: 1,
                        field: :title
                    }
                },
                category: {
                    term: {
                        size: 1,
                        field: :category
                    }
                },
                review: {
                    term: {
                        size: 1,
                        field: :review
                    }
                }
            }
        }
    )
  end

  def self.get_categories
    self.categories
  end

  def as_indexed_json(options = nil)
    self.as_json(only: [:title, :category, :review])
  end

  def next
    self.class.where("id > ?", id).first
  end

  def prev
    self.class.where("id < ?", id).last
  end
end

Post.import force: true