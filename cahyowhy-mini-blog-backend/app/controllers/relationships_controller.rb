class RelationshipsController < ApplicationController
  before_action :authenticate_request

  # follow user POST /relationships
  def create
    user = User.find(params[:followed_id])
    if curent_user.following?(user)
      render json: {message: "you allready following her / him", httpstatus: followfailed}
    else
      curent_user.follow(user)
      render json: curent_user.following, httpstatus: followsucces, status: :created
    end
  end

  # unfollow user DELETE /relationships/:id
  def destroy
    user = Relationship.find(params[:id]).followed
    curent_user.unfollow(user)
    render json:{message:"unfollow success", httpstatus: unfollowsucces}
  end

  private
  def authenticate_request
    authenticateUserModule
  end
end