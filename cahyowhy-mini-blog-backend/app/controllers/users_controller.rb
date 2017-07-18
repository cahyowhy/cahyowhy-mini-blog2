class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    @username = params[:user][:username]
    if check_username_exist(@username)
      render json: {message: "user is exist, using another username", status: deletesuccess}, status: :unprocessable_entity
    else
      if @user.save
        render json: @user, status: :created, location: @user
      else
        render json: {data:@user.errors, status: postfailed}, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: {data:@user.errors, status: updatefailed}, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
    render json: {status: deletesuccess}
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  def check_username_exist(param)
    User.exists?(:username => param)
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:username, :name, :password_confirmation, :password)
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end
