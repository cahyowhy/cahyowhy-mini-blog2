class TimelineController < BaseController
  before_action :authenticate_request, only: [:index]

  # GET /timelines with queryparams
  def index
    users_id = curent_user.following.pluck(:id) + [curent_user].pluck(:id)
    if params[:offset].blank? && params[:limit].blank?
      @posts = Post.where(user_id: users_id).order("created_at DESC").all
      @statuses = Status.where(user_id: users_id).order("created_at DESC").all
    else
      @posts = Post.where(user_id: users_id).order("created_at DESC").limit(params[:limit]).offset(params[:offset])
      @statuses = Status.where(user_id: users_id).order("created_at DESC").limit(params[:limit]).offset(params[:offset])
    end

    @timelines=[]

    @posts.each do |item|
      @timelines << item
    end

    @statuses.each do |item|
      @timelines << item
    end

    @timelines = @timelines.sort { |x, y| y[:created_at]<=>x[:created_at] }
    render json: @timelines, exclude: [:description, :descriptiontext], httpstatus: getsuccess
  end

  private
  def init_value
    super(TIMELINE)
  end
end
