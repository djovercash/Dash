class InvitesController < ApplicationController

  def update
    @invite = Invite.find_by(id: params[:id])
    @invite.update(status: params[:status])
    if @invite.valid?
      render json:@invite
    else
      render json:{message: "Invalid Information. Please try again"}, status: 401
    end
  end

  private

  def invite_params
    params.permit(:id, :status)
  end
end
