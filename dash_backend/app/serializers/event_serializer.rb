class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :location, :description, :start_time, :end_time, :categories, :users


  def users
    user_invites = []
    id = :id

    object.users.each do |user|
      custom_user = user.attributes

      custom_user[:name] = user.name
      custom_user[:invite] = user.invites.select{|invite| invite.event_id == object.id}

      user_invites.push(custom_user)
    end
    return user_invites
  end


end
