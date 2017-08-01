class PostsController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy, :show_post_next, :show_post_prev]
  before_action :authenticate_request, only: [:destroy, :create, :update]
  before_action :delete_imageposts, only: [:destroy]
  before_action :check_imageposts_params, only: [:update]

  def after_create
    link = "#{@entity.id}"
    chanels=[]
    params=[]
    message = "#{@entity.user.username} baru saja membuat post baru dengan judul #{@entity.title}"
    curent_user.followers.each do |item|
      # params << {id: item.id, message: message} its doesnt work :(
      item.notifications.create!(:user_id => item.id, :link => "posts/#{link}", :message => "#{message}", :userhasresponse_id => curent_user.id)
      chanels << (ActionCable.server.broadcast "notification_channel_#{item.id}", {message: message, link: "posts/#{link}"})
    end

    # BroadcastNotificationJob.perform_later(params) its doesnt work :(
    ActionCable.server.broadcaster_for chanels
  end

  # GET /posts/next/2
  def show_post_next
    begin
      render json: {id: @entity.next.id, title: @entity.next.title, created_at: normalize_date(@entity.next.created_at)}
    rescue
      render json: @entity.next, httpstatus: getsuccess
    end
  end

  # GET /posts/prev/2
  def show_post_prev
    begin
      render json: {id: @entity.prev.id, title: @entity.prev.title, created_at: normalize_date(@entity.prev.created_at)}
    rescue
      render json: @entity.prev, httpstatus: getsuccess
    end
  end

  private
  def init_value
    super(POST)
  end

  # check weather if the imagestatuses params is visible, render a json
  def check_imageposts_params
    unless params[:post][:imageposts].blank?
      render json: {message: "sory, we can't update image at this time", httpstatus: updatefailed}
    end
  end

  def delete_imageposts
    @entity.imageposts.each do |item|
      item.destroy
    end
  end

  # Only allow a trusted parameter "white list" through.
  def post_params
    params.require(:post).permit(:title, :user_id, :description, :category, :review, :descriptiontext, :imageposts_attributes => [:imageurl, :post_id, :user_id])
  end

  def normalize_date(date)
    date.to_s.split(" ")[0]
  end
end
