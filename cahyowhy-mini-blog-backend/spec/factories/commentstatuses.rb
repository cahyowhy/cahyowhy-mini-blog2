FactoryGirl.define do
  factory :commentstatus do
    comment { Faker::Lorem.words(10) }
  end
end
