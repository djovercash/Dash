class InviteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :event_id, :admin, :status, :host
end
