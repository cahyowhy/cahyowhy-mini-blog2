class BaseController < ApplicationController
=begin
  semua text yang depanya kapital adalah,
  model. yang besar semua konstan
  untuk checking(pastikan tunggal dan bukan jamak nilainya!
  nama model tapi gak kapital)
=end
  USER = "user"
  STATUS = "status"
  POST = "post"
  LIKEPOST = "likepost"
  LIKECOMMENTPOST = "likecommentpost"
  IMAGESTATUS = "imagestatus"
  IMAGE = "image"
  IMAGEPOST = "imagepost"
  COMMENTPOST = "commentpost"
  COMMENTSTATUS = "commentstatus"
  TIMELINE = "timeline"
  NOTIFICATION = "notification"
  attr_accessor :entity
  before_action :init_value
  before_action :set_entity_params, only: [:update, :create]

  def init_value(param)
    case (param)
      when USER;
        @entity = User
        @current_entity = USER
      when STATUS
        @entity = Status
        @current_entity = STATUS
      when POST
        @entity = Post
        @current_entity = POST
      when LIKEPOST
        @entity = Likepost
        @current_entity = LIKEPOST
      when LIKECOMMENTPOST
        @entity = Likecommentpost
        @current_entity = LIKECOMMENTPOST
      when IMAGESTATUS
        @entity = Imagestatus
        @current_entity = IMAGESTATUS
      when IMAGE
        @entity = Image
        @current_entity = IMAGE
      when IMAGEPOST
        @entity = Imagepost
        @current_entity = IMAGEPOST
      when COMMENTPOST
        @entity = Commentpost
        @current_entity = COMMENTPOST
      when COMMENTSTATUS
        @entity = Commentstatus
        @current_entity = COMMENTSTATUS
      when NOTIFICATION
        @entity = Notification
        @current_entity = NOTIFICATION
    end
  end

  def index
    paramshash={}
    params.each do |key, value|
      # the content of params is url hash, request body hash, and current method
      # you can search through the url params with this method. example GET http://localhost:3000/statuses?limit=21&offset=0&user_id=2
      # will add user_id=2 hash object through the paramshash and search the status where limit=VALUE, offset=VALUE and where id user = 2
      # be sure to enclose the offset limit to url params hash to make this work
      unless key.to_s=="offset" || key.to_s=="limit" || key.to_s=="controller" || key.to_s=="action" || key.to_s==@current_entity
        paramshash[key] = value.to_i
      end
    end
    puts paramshash

    if params[:offset].blank? && params[:limit].blank?
      # @entities = @entity.where(paramshash) => actually this also work, wether the paramshash is empty
      @entities = @entity.all
    else
      @entities = @entity.limit(params[:limit]).offset(params[:offset]).where(paramshash)
    end
    render json: @entities, httpstatus: getsuccess
  end

  def show
    render json: @entity, httpstatus: getsuccess
  end

  def update
    if @entity.update(@entity_params)
      render json: @entity, httpstatus: updatesuccess
    else
      render json: @entity.errors, httpstatus: updatefailed, status: :unprocessable_entity
    end
  end

  def destroy
    @entity.destroy
    render json: {httpstatus: deletesuccess}
  end

  def create
    @entity = @entity.new(@entity_params)

    if @entity.save
      puts @current_entity == POST
      after_create if @current_entity == STATUS || @current_entity == POST || @current_entity == COMMENTPOST || @current_entity == COMMENTSTATUS || @current_entity == LIKEPOST || @current_entity == LIKECOMMENTPOST # invoke method in child after entity has been saved

      render json: @entity, httpstatus: postsuccess, status: :created, location: @entity
    else
      render json: @entity.errors, httpstatus: postfailed, status: :unprocessable_entity
    end
  end

  private

  def set_entity
    @entity = @entity.find(params[:id])
  end

  def set_entity_params
    case (@current_entity)
      when USER;
        @entity_params = user_params
      when STATUS
        @entity_params = status_params
      when POST
        @entity_params = post_params
      when LIKEPOST
        @entity_params = likepost_params
      when LIKECOMMENTPOST
        @entity_params = likecommentpost_params
      when IMAGESTATUS
        @entity_params = imagestatus_params
      when IMAGE
        @entity_params = image_params
      when IMAGEPOST
        @entity_params = imagepost_params
      when COMMENTPOST
        @entity_params = commentpost_params
      when COMMENTSTATUS
        @entity_params = commentstatus_params
      when NOTIFICATION
        @entity_params = notification_params
    end
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end