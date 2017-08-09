FactoryGirl.define do
  factory :imagepost do
    imageurl { Faker::LoremPixel.image }
  end
end
