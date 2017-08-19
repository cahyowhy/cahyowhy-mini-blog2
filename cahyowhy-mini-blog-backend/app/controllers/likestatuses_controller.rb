class LikestatusesController < BaseController
  before_action :set_entity, only: [:show]
  before_action :authenticate_request, only: [:create]
  before_action :check_current_user_like, only: [:create]

  def print_emoticon
    emoticons=[]
    @entity.get_emoticon.each do |key, value|
      emoticons<<{name: key, value: value}
    end

    render json: emoticons
  end

  private
  def init_value
    super(LIKESTATUS)
  end

  def check_current_user_like
    user_id = params[:likestatus][:user_id]
    status_id = params[:likestatus][:status_id]
    @user_like_it = Likestatus.exists?(:user_id => user_id, :status_id => status_id)
    if @user_like_it
      @delete_like = Likestatus.where(user_id: user_id, status_id: status_id)
      @delete_like.each do |item|
        item.destroy
      end

      render json: {message: "successfully delete like", httpstatus: deletesuccess, userlike: !@user_like_it}
    end
  end

  # Only allow a trusted parameter "white list" through.
  def likestatus_params
    params.require(:likestatus).permit(:user_id, :status_id, :emoticons)
  end
end
