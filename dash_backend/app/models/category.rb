class Category < ApplicationRecord
  has_many :eventlists
  has_many :events, :through => :eventlists
end
