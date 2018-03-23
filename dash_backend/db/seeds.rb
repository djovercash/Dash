# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

FriendCategory.create(name: "All")

100.times do |i|
  user = User.create(name: Faker::Name.name, email: "andrewjovercash@gmail.com", photo: "http://www.you-can-be-funny.com/images/grandamainpurple.jpg", hometown: "New York", password: '123', password_confirmation: '123')
  friendship = Friendship.create(user_id: user.id, friend_id: user.id)
  Friendlist.create(friendship_id: friendship.id, friend_category_id: 1)
end
