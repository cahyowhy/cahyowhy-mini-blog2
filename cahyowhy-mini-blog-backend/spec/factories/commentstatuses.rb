FactoryGirl.define do
  factory :commentstatus do
    association :user, factory: :user
    association :status, factory: :status
    comment { Faker::Lorem.sentence(10) }
  end
end
