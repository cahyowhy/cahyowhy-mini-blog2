FactoryGirl.define do
  factory :imagestatus do
    association :user, factory: :user
    association :status, factory: :status
    imageurl { Faker::LoremPixel.image }
  end
end
