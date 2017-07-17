class PostcommentlikesController < ApplicationController
  before_action :set_postcommentlike, only: [:show, :update, :destroy]

  # GET /postcommentlikes
  def index
    @postcommentlikes = Postcommentlike.all

    render json: @postcommentlikes
  end

  # GET /postcommentlikes/1
  def show
    render json: @postcommentlike
  end

  # POST /postcommentlikes
  def create
    @postcommentlike = Postcommentlike.new(postcommentlike_params)

    if @postcommentlike.save
      render json: @postcommentlike, status: :created, location: @postcommentlike
    else
      render json: @postcommentlike.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /postcommentlikes/1
  def update
    if @postcommentlike.update(postcommentlike_params)
      render json: @postcommentlike
    else
      render json: @postcommentlike.errors, status: :unprocessable_entity
    end
  end

  # DELETE /postcommentlikes/1
  def destroy
    @postcommentlike.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_postcommentlike
      @postcommentlike = Postcommentlike.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def postcommentlike_params
      params.require(:postcommentlike).permit(:user_id, :postcomment_id)
    end
end
