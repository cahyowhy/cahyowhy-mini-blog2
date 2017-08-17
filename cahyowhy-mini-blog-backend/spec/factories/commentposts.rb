FactoryGirl.define do
  factory :commentpost do
    association :user, factory: :user
    association :post, factory: :post
    comment { Faker::Lorem.sentence(10) }
  end
end
