class EventsController < ApplicationController

  def index
    @events = Event.all
    render json:@events
  end

  def show
    @event = Event.find_by(id: params[:id])
    render json:@event
  end

  def create
    @event = Event.new(title: params[:title], location: params[:location], description: params[:description], start_time: params[:start_time], end_time: params[:end_time])
    if @event.valid?
      @event.save
      Invite.create(user_id: params[:user_id], event_id: @event.id, admin: true, status: "confirmed", host: true )
      render json:@event
    else
      render json:{message: "Invalid Information. Please try again"}, status: 401
    end
  end

  private

  def event_params
    params.permit(:title, :location, :description, :start_time, :end_time, :user_id)
  end

end
