FactoryGirl.define do
  factory :imagepost do
    association :user, factory: :user
    association :post, factory: :post
    imageurl { Faker::LoremPixel.image }
  end
end
