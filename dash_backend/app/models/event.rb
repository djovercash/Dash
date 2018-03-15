class Event < ApplicationRecord
  has_many :invites
  has_many :users, :through => :invites

  has_many :eventlists
  has_many :categories, :through => :eventlists


  def google_map
    location = self.location.gsub(/\s/,'+')
    location = location.gsub(',+',',')
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyBKVFYXi0xh1ezi1fDswB5fLvvQXd6pSGA&q=#{location}"
  end
end
