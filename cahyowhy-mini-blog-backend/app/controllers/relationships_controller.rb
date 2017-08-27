class RelationshipsController < BaseController
  before_action :authenticate_request

  # follow user POST /relationships
  def create
    user = User.find(params[:id])
    if curent_user.following?(user)
      @entity=user #entity disini berarti user yang di follow si current user! BUKAN CURENT_USER!
      broadcast_notification
      render json: {message: "you allready following her / him", httpstatus: followfailed}
    else
      curent_user.follow(user)
      render json:  {id: Relationship.last.id, message: "follow success", httpstatus: followsucces}, status: :created
    end
  end

  # unfollow user DELETE /relationships/:id
  def destroy
    user = Relationship.find(params[:id]).followed
    curent_user.unfollow(user)
    render json: {message: "unfollow success", httpstatus: unfollowsucces}
  end

  # get id relationship when unfollowing
  def show_id_by_userfollow
    following = Relationship.where(follower_id: params[:follower_id], followed_id: params[:followed_id])[0];
    render json: {id: following.id, followed_id: following.followed_id, follower_id: following.follower_id}
  end

  private
  def init_value
    super(RELATIONSHIP)
  end
end
