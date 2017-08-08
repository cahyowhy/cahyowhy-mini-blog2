require 'rails_helper'

RSpec.describe Likecommentpost, type: :model do
  it { should belong_to :user }
  it { should belong_to :commentpost }
  it { should belong_to :post }
end