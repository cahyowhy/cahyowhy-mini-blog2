class AuthtokenController < ApplicationController
  before_action :authenticate_request, only: [:auth_token]

  def auth_token
    render json: {message: "SUCCESFULLY AUTHENTICATE", status: authsucces, id: curent_user.id}
  end

  private

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end
