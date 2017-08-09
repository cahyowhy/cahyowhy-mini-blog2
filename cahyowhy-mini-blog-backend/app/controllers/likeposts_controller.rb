class LikepostsController < BaseController
  before_action :set_entity, only: [:show]
  before_action :authenticate_request, only: [:create]
  before_action :check_current_user_like, only: [:create]

  private
  def init_value
    super(LIKEPOST)
  end

  # Only allow a trusted parameter "white list" through.
  def likepost_params
    params.require(:likepost).permit(:user_id, :post_id)
  end

  def check_current_user_like
    user_id = params[:likepost][:user_id]
    post_id = params[:likepost][:post_id]
    if Likepost.exists?(:user_id => user_id, :post_id => post_id)
      @delete_like = Likepost.where(user_id: user_id, post_id: post_id)
      @delete_like.each do |item|
        item.destroy
      end

      render json: {message: "successfully delete like", httpstatus: deletesuccess}
    end
  end
end
