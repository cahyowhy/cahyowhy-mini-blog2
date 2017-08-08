require 'rails_helper'

RSpec.describe Commentstatus, type: :model do
  it { should belong_to :user }
  it { should belong_to :status }
  it { should validate_presence_of(:comment) }
end