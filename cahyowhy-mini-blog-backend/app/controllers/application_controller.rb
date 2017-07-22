class ApplicationController < ActionController::API
  include AuthenticateUserModule
  include Response_status
  attr_reader :curent_user

end
