class Friendship < ApplicationRecord
  belongs_to :user
  belongs_to :friend, :class_name => "User"

  has_many :friendlists
  has_many :friend_categories, :through => :friendlists
end
