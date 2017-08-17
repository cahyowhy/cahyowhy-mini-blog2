FactoryGirl.define do
  factory :status do
    association :user, factory: :user
    statushtml { Faker::Lorem.sentence(50) }
    statustext { Faker::Lorem.sentence(50) }
  end
end
