require 'rails_helper'

RSpec.describe User, type: :model do
  [:username, :name, :password].each do |attribute|
    it { should validate_presence_of(attribute) }
  end
  [:posts, :followers, :following, :notifications, :statuses].each do |attribute|
    it { should have_many(attribute) }
  end

  it { should have_secure_password }
end