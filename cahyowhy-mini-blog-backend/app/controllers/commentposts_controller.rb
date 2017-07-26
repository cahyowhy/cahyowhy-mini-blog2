class CommentpostsController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:destroy, :create, :update]

  def after_create
    link = "#{@entity.post.id}"
    message = "#{@entity.user.username} mengkomen pos mu yang #{@entity.post.title}"

    userhaspost = @entity.post.user
    unless @entity.user==userhaspost
      userhaspost.notifications.create!(:user_id => userhaspost.id, :link => "posts/#{link}", :message => "#{message}")
    end
  end

  private
  def init_value
    super(COMMENTPOST)
  end

  # Only allow a trusted parameter "white list" through.
  def commentpost_params
    params.require(:commentpost).permit(:comment, :user_id, :post_id)
  end
end
