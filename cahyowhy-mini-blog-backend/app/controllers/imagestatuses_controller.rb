class ImagestatusesController < ApplicationController
  before_action :set_imagestatus, only: [:show, :update, :destroy]

  # GET /imagestatuses
  def index
    @imagestatuses = Imagestatus.all

    render json: @imagestatuses
  end

  # GET /imagestatuses/1
  def show
    render json: @imagestatus
  end

  # POST /imagestatuses
  def create
    @imagestatus = Imagestatus.new(imagestatus_params)

    if @imagestatus.save
      render json: @imagestatus, status: :created, location: @imagestatus
    else
      render json: @imagestatus.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /imagestatuses/1
  def update
    if @imagestatus.update(imagestatus_params)
      render json: @imagestatus
    else
      render json: @imagestatus.errors, status: :unprocessable_entity
    end
  end

  # DELETE /imagestatuses/1
  def destroy
    @imagestatus.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_imagestatus
      @imagestatus = Imagestatus.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def imagestatus_params
      params.require(:imagestatus).permit(:user_id, :status_id, :imageurl)
    end
end
