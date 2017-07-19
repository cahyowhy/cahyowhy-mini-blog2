class LikepostsController < ApplicationController
  before_action :set_likepost, only: [:show]
  before_action :authenticate_request, only: [:create]

  # GET /likeposts
  def index
    @likeposts = Likepost.all

    render json: @likeposts
  end

  # GET /likeposts/1
  def show
    render json: @likepost
  end

  # POST /likeposts
  def create
    @likepost = Likepost.new(likepost_params)
    @id_user = params[:likepost][:user_id]
    @id_post = params[:likepost][:post_id]

    if check_current_user_like(@id_user, @id_post)
      @delete_like = Likepost.where(user_id: @id_user, post_id: @id_post)
      @delete_like.each do |item|
        item.destroy
      end

      render json: {message: "successfully delete like", status: deletesuccess}
    else
      if @likepost.save
        render json: @likepost, status: :created, location: @likepost
      else
        render json: @likepost.errors, status: :unprocessable_entity
      end
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_likepost
    @likepost = Likepost.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def likepost_params
    params.require(:likepost).permit(:user_id, :post_id)
  end

  # check current user if like the post
  def check_current_user_like(userId, postId)
    Likepost.exists?(:user_id=>userId, :post_id=>postId)
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end
