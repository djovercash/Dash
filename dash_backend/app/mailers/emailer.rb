class Emailer < ActionMailer::Base
  default from: 'andrewjovercash@gmail.com'

  def sendEmail(user, event)
    @user = user
    @event = event
    mail(to: 'andrewjovercash@gmail.com',
        subject: "YOU'RE INVITED",
        body: "#{@user} just invited you to an event!
          Title: #{@event.title}
          Description: #{@event.description}
          Start Time: #{@event.start_time}
          End Time: #{@event.end_time}
          Location: #{@event.location}
          Swing back and RSVP!",
        content_type: "text/html")
  end
end
