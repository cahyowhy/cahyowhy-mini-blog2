FactoryGirl.define do
  factory :post do
    title { Faker::Name.name }
    review { Faker::Lorem.words(50) }
    description { Faker::Lorem.words(100) }
    descriptiontext { Faker::Lorem.words(100) }
    category { Faker::Number.between(0, 8) }
  end
end
