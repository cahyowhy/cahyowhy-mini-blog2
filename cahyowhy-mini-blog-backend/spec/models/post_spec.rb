require 'rails_helper'

RSpec.describe Post, type: :model do
  [:imageposts, :likeposts].each do |attribute|
    it { should have_many(attribute) }
  end

  [:title, :description, :category, :review, :descriptiontext].each do |attribute|
    it { should validate_presence_of(attribute) }
  end

  it { should belong_to :user }
  it { should accept_nested_attributes_for(:imageposts) }
  it { should define_enum_for(:category) }
end