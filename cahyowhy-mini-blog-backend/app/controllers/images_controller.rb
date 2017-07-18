class ImagesController < ApplicationController
  before_action :set_image, only: [:show, :destroy]
  before_action :authenticate_request, only: [:destroy, :create]
  before_action :set_image_by_user, only: [:show_image_by_user]

  # GET /images
  def index
    @images = Image.all

    render json: @images
  end

  # GET /images/user/1
  def show_image_by_user
    render json: @image
  end

  # GET /images/1
  def show
    render json: @image
  end

  # POST /images
  def create
    @multi_images = Array.new

    image_params[:imagepath_data].each.with_index do |file, index|
      @single_image = Image.new(:path => file, :user_id => curent_user.id)
      if @single_image.save
        @multi_images.push(@single_image)
        if image_params[:imagepath_data].length == index+1
          render json: @multi_images
          break
        end
      else
        render json: {message: "SOME FILE CAN'T BE SAVED!", status: postfailed}
        break
      end
    end
  end

  # DELETE /images/1
  def destroy
    remove_img(@image.path.url)
    @image.destroy
    render json: {message: "delete success!", status: deletesuccess}
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_image
    @image = Image.find(params[:id])
  end

  def remove_img(param)
    File.delete("#{Rails.root}/public#{param}")
  end

  # Only allow a trusted parameter "white list" through.
  def image_params
    params.require(:image).permit(:imagepath_data => []).merge(user: curent_user)
  end

  # search image by user id
  def set_image_by_user
    @image = Image.where(:user_id => params[:id])
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end
