class UsersController < BaseController
  before_action :check_username_exist, only: [:create, :update]
  before_action :set_entity, only: [:show, :update, :destroy, :following, :followers]
  before_action :authenticate_request, only: [:update, :destroy]

  # GET users/:id/following
  def following
    render json: @entity.following, httpstatus: getsuccess
  end

  # GET users/:id/followers
  def followers
    render json: @entity.followers, httpstatus: getsuccess
  end

  private
  def init_value
    super(USER)
  end

  def check_username_exist
    if User.exists?(:username => params[:user][:username])
      render json: {message: "user is exist, using another username", httpstatus: postfailed}
    end
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:username, :name, :password_confirmation, :password, :imageurl)
  end
end