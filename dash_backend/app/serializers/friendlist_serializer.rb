class FriendlistSerializer < ActiveModel::Serializer
  attributes :id, :friendship_id, :friend_category_id
end
