class TimelineController < BaseController
  before_action :authenticate_request, only: [:index]

  # GET /timelines with queryparams
  def index
    users_id = curent_user.following.pluck(:id) + [curent_user].pluck(:id)
    if params[:offset].blank? && params[:limit].blank?
      @posts = Post.where(user_id: users_id).order(:created_at).all
      @statuses = Status.where(user_id: users_id).order(:created_at).all
    else
      @posts = Post.where(user_id: users_id).order(:created_at).limit(params[:limit]).offset(params[:offset])
      @statuses = Status.where(user_id: users_id).order(:created_at).limit(params[:limit]).offset(params[:offset])
    end
    # {posts: @posts, statuses: @statuses, httpstatus: getsuccess}
    @timelines = {posts: @posts, statuses: @statuses}
    render json: @timelines, httpstatus: getsuccess
  end

  private
  def init_value
    super(TIMELINE)
  end
end
