require 'rails_helper'

RSpec.describe Imagepost, type: :model do
  it { should validate_presence_of(:imageurl) }
  it { should belong_to :user }
  it { should belong_to :post }
end