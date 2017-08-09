FactoryGirl.define do
  factory :imagestatus do
    imageurl { Faker::LoremPixel.image }
  end
end
