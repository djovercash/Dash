class FriendCategory < ApplicationRecord
  has_many :friendlists
  has_many :friendships, :through => :friendlists
end
