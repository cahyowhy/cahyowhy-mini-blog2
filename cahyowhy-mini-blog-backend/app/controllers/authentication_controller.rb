class AuthenticationController < ApplicationController
  attr_reader :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:username], params[:password])

    if command.success?
      @user = User.find_by_username(params[:username])
      render json:{auth_token: command.result, user: @user}
    else
      render json:{message: "WRONG PASSWORD! OR USERNAME!"}, status: :unauthorized
    end
  end
end
