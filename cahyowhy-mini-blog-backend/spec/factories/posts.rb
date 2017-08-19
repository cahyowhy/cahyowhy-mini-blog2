FactoryGirl.define do
  factory :post do
    association :user, factory: :user
    title { Faker::Name.name }
    review { Faker::Lorem.sentence(50) }
    description { Faker::Lorem.sentence(100) }
    descriptiontext { Faker::Lorem.sentence(100) }
    category { Faker::Number.between(0, 8) }
  end
end
