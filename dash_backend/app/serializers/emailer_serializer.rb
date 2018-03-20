class EmailerSerializer < ActiveModel::Serializer
  attributes :id, :user, :event
end
