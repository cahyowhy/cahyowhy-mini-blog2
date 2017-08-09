FactoryGirl.define do
  factory :status do
    status { Faker::Lorem.words(50) }
    statustext { Faker::Lorem.words(50) }
  end
end
