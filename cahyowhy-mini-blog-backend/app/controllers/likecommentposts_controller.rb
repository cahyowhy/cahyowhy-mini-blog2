class LikecommentpostsController < BaseController
  before_action :set_entity, only: [:show]
  before_action :authenticate_request, only: [:create]
  before_action :check_current_user_like, only: [:create]

  def after_create
    link = "#{@entity.post.id}"
    message = "#{@entity.user.username} melike komenmu yang #{@entity.commentpost.comment}"

    userhaspost = @entity.commentpost.user
    unless @entity.user==userhaspost
      userhaspost.notifications.create!(:user_id => userhaspost.id, :link => "posts/#{link}", :message => "#{message}")
    end
  end

  private
  def init_value
    super(LIKECOMMENTPOST)
  end

  def check_current_user_like
    user_id = params[:likecommentpost][:user_id]
    post_id = params[:likecommentpost][:post_id]
    if Likecommentpost.exists?(:user_id => user_id, :post_id => post_id)
      @delete_like = Likecommentpost.where(user_id: user_id, post_id: post_id)
      @delete_like.each do |item|
        item.destroy
      end

      render json: {message: "successfully delete like", status: deletesuccess}
    end
  end

  # Only allow a trusted parameter "white list" through.
  def likecommentpost_params
    params.require(:likecommentpost).permit(:user_id, :commentpost_id, :post_id)
  end
end
