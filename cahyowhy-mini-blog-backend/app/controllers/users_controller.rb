class UsersController < BaseController
  before_action :check_username_exist, only: [:create, :update]
  before_action :set_entity, only: [:show, :update, :destroy, :following, :followers]
  before_action :authenticate_request, only: [:update, :destroy, :check_user_follow]

  # GET users/:id/following
  def following
    render json: @entity.following, httpstatus: getsuccess
  end

  # GET users/:id/followers
  def followers
    render json: @entity.followers, httpstatus: getsuccess
  end

  def check_user_follow
    user = User.find(params[:id])
    is_current_user_follow_user = curent_user.following?(user)
    render json: {httpstatus: getsuccess, isfollowing: is_current_user_follow_user}
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