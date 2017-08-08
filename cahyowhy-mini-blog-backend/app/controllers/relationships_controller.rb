class RelationshipsController < BaseController
  before_action :authenticate_request

  # follow user POST /relationships
  def create
    user = User.find(params[:followed_id])
    if curent_user.following?(user)
      @entity=user #entity disini berarti user yang di follow si current user! BUKAN CURENT_USER!
      broadcast_notification
      render json: {message: "you allready following her / him", httpstatus: followfailed}, status: :accepted
    else
      curent_user.follow(user)
      render json: curent_user.following, httpstatus: followsucces, status: :created
    end
  end

  # unfollow user DELETE /relationships/:id
  def destroy
    user = Relationship.find(params[:id]).followed
    curent_user.unfollow(user)
    render json: {message: "unfollow success", httpstatus: unfollowsucces}, status: :success
  end

  private
  def init_value
    super(RELATIONSHIP)
  end
end