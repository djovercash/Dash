class Friendlist < ApplicationRecord
  belongs_to :friendship
  belongs_to :friend_category
end
