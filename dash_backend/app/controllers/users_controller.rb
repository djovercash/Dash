class UsersController < ApplicationController

  def index
    @users = User.all
    render json:@users
  end

  def show
    @user = User.find_by(id: params[:id])
    render json:@user
  end

  def create
  @user = User.new(user_params)
    if @user.valid?
      @user.save
      render json:@user
    else
      render json:{message: "Invalid Information. Please try again"}, status: 401
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user.try(:authenticate, params[:password])
      @user = user
      render json:@user
    else
      render json:{message: "User not found"}, status: 401
    end
  end

  private

  def user_params
    params.permit(:name, :password, :password_confirmation, :email, :hometown, :photo)
  end
end
