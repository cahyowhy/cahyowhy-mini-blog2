# class UsermailerMailer < ApplicationMailer
#   default from: 'cahyowhy01@gmail.com'
#
#   def welcome_email(user)
#     @user = user
#     @url  = "hudagwdygawhjdgaw ghj awghjdgaw gdghjaw gjagwdhjaw"
#     puts app_config[Rails.env]['website_url']
#     puts "jancok"
#     mail(to: @user.email, subject: 'Welcome to My Awesome Site')
#   end
# end
class UsermailerMailer < ApplicationMailer
  default from: 'cahyowhy01@gmail.com'

  def welcome_email(user)
    @user = user
    @url = ENV['website_url']
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
