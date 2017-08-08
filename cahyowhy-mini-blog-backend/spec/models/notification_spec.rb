require 'rails_helper'

RSpec.describe Notification, type: :model do
  it { should belong_to :user }
  it { should belong_to :userhasresponse }
  it { should validate_presence_of(:message) }
  it { should validate_presence_of(:link) }
end