class PostsController < ApplicationController
  before_action :set_post, only: [:show, :update, :destroy,:show_post_next,:show_post_prev]
  before_action :authenticate_request, only: [:destroy, :create, :update]
  before_action :set_post_by_user, only: [:show_post_by_user]

  # GET /posts
  def index
    @posts = Post.all

    render json: @posts
  end

  # GET /posts/next/2
  def show_post_next
    begin
      render json: {id:@post.next.id, title:@post.next.title, created_at:normalize_date(@post.next.created_at)}
    rescue
      render json: @post.next
    end
  end

  # GET /posts/prev/2
  def show_post_prev
    begin
      render json: {id:@post.prev.id, title:@post.prev.title, created_at:normalize_date(@post.prev.created_at)}
    rescue
      render json: @post.prev
    end
  end

  # GET /posts/user/2
  def show_post_by_user
    render json: @post
  end

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  def set_post_by_user
    @post = Post.where(:user_id => params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def post_params
    params.require(:post).permit(:title, :user_id, :description, :image, :category)
  end

  def normalize_date(date)
    date.to_s.split(" ")[0]
  end

  # do authentication
  def authenticate_request
    authenticateUserModule()
  end
end
