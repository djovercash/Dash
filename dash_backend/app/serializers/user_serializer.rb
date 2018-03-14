class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :hometown, :password_digest, :friends, :events

  def friends
    friend_category = []

    object.friends.each do |friend|
      object.friendships.each do |friendship|
        if friend.id == friendship.friend_id
          custom_friend = friend.attributes
          custom_friend[:friend_category] = friendship.friend_categories
          friend_category.push(custom_friend)
        end
      end
    end
    return friend_category
  end

  def events
    event_invites = []

    object.events.each do |event|
      custom_event = event.attributes

      custom_event[:title] = event.title
      custom_event[:invite] = event.invites.select{|invite| invite.user_id == object.id}

      event_invites.push(custom_event)
    end
    return event_invites
  end

end
