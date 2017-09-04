class AuthenticationController < ApplicationController
  attr_reader :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:username], params[:password])

    if command.success?
      @user = User.find_by_username(params[:username])
      puts params[:username]
      puts params[:password]
      if @user.confirmed
        render json: {auth_token: command.result, user: @user, httpstatus: authsucces}
      else
        render json: {message: "not authorized", httpstatus: authfailed}, status: :unauthorized
      end
    else
      render json: {message: "not authorized", httpstatus: authfailed}, status: :unauthorized
    end
  end

  def authenticate_facebook
    is_user_has_facebook_id = User.has_facebook_id(params[:facebook_id])
    if is_user_has_facebook_id
      user = User.find_by(facebook_id: params[:facebook_id])
      command = AuthenticateUser.call(user.username, nil, params[:facebook_id])

      if command.success? && user.confirmed
        render json: {auth_token: command.result, user: user, httpstatus: authsucces}
      else
        render json: {message: "not authorized", httpstatus: authfailed}
      end

    else
      render json: {message: "not authorized", httpstatus: authfailed}
    end
  end
end
