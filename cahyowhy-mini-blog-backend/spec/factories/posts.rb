FactoryGirl.define do
  factory :post do
    username { Faker::Name.name }
    name { Faker::Name.name }
    imageurl { Faker::Internet.domain_name }
    password 'foooooooooobar'
  end
end
