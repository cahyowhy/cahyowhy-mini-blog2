FactoryGirl.define do
  factory :commentpost do
    comment { Faker::Lorem.words(10) }
  end
end
