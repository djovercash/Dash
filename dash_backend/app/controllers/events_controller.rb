class EventsController < ApplicationController

  def index
    @events = Event.all
    render json:@events
  end

  def show
    @event = Event.find_by(id: params[:id])
    render json:@event
  end
  
end
