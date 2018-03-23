class FriendCategoriesController < ApplicationController


  def index
    @fc_categories = FriendCategory.all
    render json:@fc_categories
  end

  def show
    @fc_category = FriendCategory.find_by(id: params[:id])
    render json:@fc_category
  end

  def create
    @fc_category = FriendCategory.create(fc_params)
    @friendship = Friendship.find_by(user_id: params[:user_id], friend_id: params[:user_id])
    @friendlist = Friendlist.create(friendship_id: @friendship.id, friend_category_id: @fc_category.id)
    render json:@fc_category
  end


  private

  def fc_params
    params.permit(:name)
  end
end
