class Event < ApplicationRecord
  has_many :invites
  has_many :users, :through => :invites

  has_many :eventlists
  has_many :categories, :through => :eventlists
end
