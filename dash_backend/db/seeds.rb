# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

100.times do |i|
  User.create(name: Faker::Name.name, email: "andrewjovercash@gmail.com", photo: "http://www.you-can-be-funny.com/images/grandamainpurple.jpg", hometown: Faker::Address.state, password: '123', password_confirmation: '123')
end

500.times do |i|
  Friendship.create(user_id: Random.new.rand(1..100), friend_id: Random.new.rand(1..100))
end
