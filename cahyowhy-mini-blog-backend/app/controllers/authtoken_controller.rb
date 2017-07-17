class AuthtokenController < ApplicationController
  before_action :authenticate_request, only: [:auth_token]

  def auth_token
    render json:{message:"SUCCESFULLY AUTHENTICATE", status:200}, status: 200
  end

  private

  # do authentication
  def authenticate_request
    authenticateUserModule()
  end
end
