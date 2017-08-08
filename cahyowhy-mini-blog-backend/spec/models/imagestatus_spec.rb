require 'rails_helper'

RSpec.describe Imagestatus, type: :model do
  it { should validate_presence_of(:imageurl) }
  it { should belong_to :user }
  it { should belong_to :status }
end