class User < ApplicationRecord
  has_secure_password

  has_many :friendships
  has_many :friends, :through => :friendships

  has_many :friendlists, :through => :friendships
  has_many :friend_categories, :through => :friendlists

  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => 'friend_id'
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  has_many :invites
  has_many :events, :through => :invites
end
