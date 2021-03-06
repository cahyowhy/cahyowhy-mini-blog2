class LikecommentpostsController < BaseController
  before_action :set_entity, only: [:show]
  before_action :authenticate_request, only: [:create]
  before_action :check_current_user_like, only: [:create]

  private
  def init_value
    super(LIKECOMMENTPOST)
  end

  def check_current_user_like
    user_id = params[:likecommentpost][:user_id]
    post_id = params[:likecommentpost][:post_id]
    commentpost_id = params[:likecommentpost][:commentpost_id]
    if Likecommentpost.exists?(:user_id => user_id, :post_id => post_id, :commentpost_id => commentpost_id)
      @delete_like = Likecommentpost.where(user_id: user_id, post_id: post_id)
      @delete_like.each do |item|
        item.destroy
      end

      render json: {message: "successfully delete like", httpstatus: deletesuccess}
    end
  end

  # Only allow a trusted parameter "white list" through.
  def likecommentpost_params
    params.require(:likecommentpost).permit(:user_id, :commentpost_id, :post_id)
  end
end
