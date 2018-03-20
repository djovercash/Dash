class Emailer < ActionMailer::Base
  default from: 'andrewjovercash@gmail.com'

  def sendEmail(user)
    @user = user
    mail(to: 'andrewjovercash@gmail.com',
        subject: "YOU'RE INVITED",
        body: "#{@user} just invited you to an event! Swing back and RSVP!",
        content_type: "text/html")
  end
end
