FactoryGirl.define do
  factory :commentpostn do
    comment { Faker::Lorem.words(10) }
  end
end
