class CommentstatusesController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:destroy, :create, :update]

  def after_create
    link = "#{@entity.status.id}"
    message = "#{@entity.user.username} mengkomen status mu yang #{@entity.status.statustext}"

    userhaspost = @entity.status.user
    unless @entity.user==userhaspost
      userhaspost.notifications.create!(:user_id => userhaspost.id, :link => "status/#{link}", :message => "#{message}", :userhasresponse_id => curent_user.id)
    end
  end

  private
  def init_value
    super(COMMENTSTATUS)
  end

  # Only allow a trusted parameter "white list" through.
  def commentstatus_params
    params.require(:commentstatus).permit(:comment, :user_id, :status_id)
  end
end
