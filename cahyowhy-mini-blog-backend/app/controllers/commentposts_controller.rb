class CommentpostsController < ApplicationController
  before_action :set_commentpost, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:destroy, :create, :update]
  before_action :set_commentpost_by_post, only: [:show_commentpost_by_post]

  # GET /commentposts
  def index
    @commentposts = Commentpost.all

    render json: @commentposts
  end

  # GET /commentposts/post/1
  def show_commentpost_by_post 
    render json: @commentpost
  end

  # GET /commentposts/1
  def show
    render json: @commentpost
  end

  # POST /commentposts
  def create
    @commentpost = Commentpost.new(commentpost_params)

    if @commentpost.save
      render json: @commentpost, status: :created, location: @commentpost
    else
      render json: @commentpost.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /commentposts/1
  def update
    if @commentpost.update(commentpost_params)
      render json: @commentpost
    else
      render json: @commentpost.errors, status: :unprocessable_entity
    end
  end

  # DELETE /commentposts/1
  def destroy
    @commentpost.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_commentpost
    @commentpost = Commentpost.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def commentpost_params
    params.require(:commentpost).permit(:comment, :user_id, :post_id)
  end

  # do authentication
  def authenticate_request
    authenticateUserModule()
  end

  def set_commentpost_by_post 
    @commentpost = Commentpost.where(:post_id => params[:id])
  end
end
