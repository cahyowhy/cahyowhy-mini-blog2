class PostcommentsController < ApplicationController
  before_action :set_postcomment, only: [:show, :update, :destroy]

  # GET /postcomments
  def index
    @postcomments = Postcomment.all

    render json: @postcomments
  end

  # GET /postcomments/1
  def show
    render json: @postcomment
  end

  # POST /postcomments
  def create
    @postcomment = Postcomment.new(postcomment_params)

    if @postcomment.save
      render json: @postcomment, status: :created, location: @postcomment
    else
      render json: @postcomment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /postcomments/1
  def update
    if @postcomment.update(postcomment_params)
      render json: @postcomment
    else
      render json: @postcomment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /postcomments/1
  def destroy
    @postcomment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_postcomment
      @postcomment = Postcomment.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def postcomment_params
      params.require(:postcomment).permit(:user_id, :comment)
    end
end
