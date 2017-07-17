class ApplicationController < ActionController::API
  include AuthenticateUserModule
  attr_reader :curent_user
end
