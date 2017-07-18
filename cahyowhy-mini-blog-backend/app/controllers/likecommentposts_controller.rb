class LikecommentpostsController < ApplicationController
  before_action :set_likecommentpost, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:destroy, :create, :update]

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
      
      render json: {message:"successfully delete like"}
    else
      if @likecommentpost.save
        render json: @likecommentpost, status: :created, location: @likecommentpost
      else
        render json: @likecommentpost.errors, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /likecommentposts/1
  def update
    if @likecommentpost.update(likecommentpost_params)
      render json: @likecommentpost
    else
      render json: @likecommentpost.errors, status: :unprocessable_entity
    end
  end

  # DELETE /likecommentposts/1
  def destroy
    @likecommentpost.destroy
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
    authenticateUserModule()
  end
end
