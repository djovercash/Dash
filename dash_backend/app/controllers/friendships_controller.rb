class FriendshipsController < ApplicationController


  def create
    @friendship = Friendship.new(friendship_params)
    if @friendship.valid?
      @friendship.save
      @user = User.find_by(id: @friendship.friend_id)
      render json:@user
    else
      render json:{message: "Invalid Information. Please try again"}, status: 401
    end
  end

  private

  def friendship_params
    params.permit(:user_id, :friend_id)
  end
end
