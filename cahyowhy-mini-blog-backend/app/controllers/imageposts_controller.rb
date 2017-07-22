class ImagepostsController < ApplicationController
  before_action :set_imagepost, only: [:show, :update, :destroy]

  # GET /imageposts
  def index
    @imageposts = Imagepost.all

    render json: @imageposts
  end

  # GET /imageposts/1
  def show
    render json: @imagepost
  end

  # POST /imageposts
  def create
    @imagepost = Imagepost.new(imagepost_params)

    if @imagepost.save
      render json: @imagepost, status: :created, location: @imagepost
    else
      render json: @imagepost.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /imageposts/1
  def update
    if @imagepost.update(imagepost_params)
      render json: @imagepost
    else
      render json: @imagepost.errors, status: :unprocessable_entity
    end
  end

  # DELETE /imageposts/1
  def destroy
    @imagepost.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_imagepost
      @imagepost = Imagepost.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def imagepost_params
      params.require(:imagepost).permit(:user_id, :post_id, :imageurl)
    end
end
