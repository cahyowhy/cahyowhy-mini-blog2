class LikecommentpostsController < ApplicationController
  before_action :set_likecommentpost, only: [:show]
  before_action :authenticate_request, only: [:create]

  # GET /likecommentposts
  def index
    @likecommentposts = Likecommentpost.all

    render json: @likecommentposts
  end

  # GET /likecommentposts/1
  def show
    render json: @likecommentpost
  end

  # POST /likecommentposts
  def create
    @likecommentpost = Likecommentpost.new(likecommentpost_params)
    @id_user = params[:likecommentpost][:user_id]

    if check_current_user_like(@id_user)
      @delete_like = Likecommentpost.where(user_id: @id_user)
      @delete_like.each do |item|
        item.destroy
      end

      render json: {message: "successfully delete like", status: deletesuccess}
    else
      if @likecommentpost.save
        render json: @likecommentpost, status: :created, location: @likecommentpost
      else
        render json: {data: @likecommentpost.errors, status: deletefailed}, status: :unprocessable_entity
      end
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_likecommentpost
    @likecommentpost = Likecommentpost.find(params[:id])
  end

  def check_current_user_like(param)
    Likecommentpost.exists?(:user_id => param)
  end

  # Only allow a trusted parameter "white list" through.
  def likecommentpost_params
    params.require(:likecommentpost).permit(:user_id, :commentpost_id)
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end
