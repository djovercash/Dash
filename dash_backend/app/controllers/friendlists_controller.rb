class FriendlistsController < ApplicationController

  def index
    @friendlists = Friendlist.all
    render json:@friendlists
  end

  def create
    @user = User.find_by(id: params[:user])
    @friend = User.find_by(id: params[:friend])
    @friendship = Friendship.find_by(user_id: @user.id, friend_id: @friend.id)
    @create_ids = params[:create_ids]
    @destroy_ids = params[:destroy_ids]
    if @create_ids.length > 0
      @create_ids.each do |create_id|
        @category = FriendCategory.find_by(id: create_id)
        @friendlistCheck = Friendlist.find_by(friendship_id: @friendship.id, friend_category_id: @category.id)
        if @friendlistCheck.nil?
          @friendlist = Friendlist.create(friendship_id: @friendship.id, friend_category_id: @category.id)
        end
      end
    end
    if @destroy_ids.length > 0
      @destroy_ids.each do |destroy_id|
        @category = FriendCategory.find_by(id: destroy_id)
        @friendlistCheck = Friendlist.find_by(friendship_id: @friendship.id, friend_category_id: @category.id)
        if @friendlistCheck
          @friendlistCheck.destroy
        end
      end
    end
    render json:@user
  end
end
