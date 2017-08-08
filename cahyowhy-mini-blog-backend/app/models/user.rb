class User < ApplicationRecord
  include Searchable
  setting_index([{attr: :username, type: :string}, {attr: :name, type: :string}])

  has_secure_password
  validates :password, :presence => true, :length => {:minimum => 8}, on: :create
  validates_presence_of :username, :name, on: :create

  has_many :active_relationships, class_name: "Relationship",
           foreign_key: "follower_id",
           dependent: :destroy
  has_many :passive_relationships, class_name: "Relationship",
           foreign_key: "followed_id",
           dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :notifications
  has_many :posts
  has_many :statuses

  def self.search(query)
    __elasticsearch__.search(
        {
            query: {
                multi_match: {
                    query: query,
                    fields: ['username^5', 'name'] #the ^5 is indicating that username fields is importance5x thane name
                }
            },
            suggest: {
                text: query,
                username: {
                    term: {
                        size: 1,
                        field: :username
                    }
                },
                name: {
                    term: {
                        size: 1,
                        field: :name
                    }
                }
            }
        }
    )
  end

  def as_indexed_json(options = nil)
    self.as_json(only: [:username, :name])
  end

  def follow(other_user)
    following << other_user
  end

  # Unfollows a user.
  def unfollow(other_user)
    following.delete(other_user)
  end


  # Returns true if the current user is following the other user.
  def following?(other_user)
    following.include?(other_user)
  end
end

User.import force: true
