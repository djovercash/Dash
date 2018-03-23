class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :photo, :hometown, :friends, :events, :friend_categories

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

  def friend_categories
    friend_categories = []
    friend_categories.push(object.friend_categories.uniq {|category| category.name})
    return friend_categories[0]
  end

  def events
    event_invites = []

    object.events.each do |event|
      custom_event = event.attributes
      custom_event[:title] = event.title
      custom_event[:invites] = event.invites.select{|invite| invite.user_id == object.id}

      event_invites.push(custom_event)
    end
    return event_invites
  end

end
