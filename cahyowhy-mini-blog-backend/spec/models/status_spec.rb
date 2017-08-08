require 'rails_helper'

RSpec.describe Status, type: :model do
  [:statushtml, :statustext].each do |attribute|
    it { should validate_presence_of(attribute) }
  end
  [:imagestatuses, :commentstatuses].each do |attribute|
    it { should have_many(attribute) }
  end
  it { should belong_to :user }
  it { should accept_nested_attributes_for(:imagestatuses) }
end