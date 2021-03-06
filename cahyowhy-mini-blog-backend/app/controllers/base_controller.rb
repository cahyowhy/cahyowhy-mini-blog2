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
  LIKESTATUS = "likestatus"
  RELATIONSHIP = "relationship"
  attr_accessor :entity
  before_action :init_value
  # before_action :set_entity_params, only: [:update, :create], :unless => @current_entity == RELATIONSHIP
  before_action :set_entity_params, only: [:update, :create]

  def init_value(param)
    case (param)
      when USER
        @entity = User
        @current_entity = USER
      when LIKESTATUS
        @entity = Likestatus
        @current_entity = LIKESTATUS
      when RELATIONSHIP
        @current_entity = RELATIONSHIP
      # @entity = User
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
      #params dapat dari url hash di extract disini
      # the content of params is url hash, request body hash, and current method
      # you can search through the url params with this method. example GET http://localhost:3000/statuses?limit=21&offset=0&user_id=2
      # will add user_id=2 hash object through the paramshash and search the status where limit=VALUE, offset=VALUE and where id user = 2
      # be sure to enclose the offset limit to url params hash to make this work
      unless key.to_s=="offset" || key.to_s=="_json" || key.to_s=="limit" || key.to_s=="controller" || key.to_s=="action" || key.to_s==@current_entity
        paramshash[key] = value.to_i
      end
    end

    if params[:query].present? && params[:offset].present? && params[:limit].present?
      @entities = @entity.search(params[:query]).records.offset(params[:offset]).limit(params[:limit])
    elsif params[:offset].blank? && params[:limit].blank?
      # @entities = @entity.where(paramshash) => actually this also work, wether the paramshash is empty
      @current_entity==POST ?
          @entities = @entity.left_outer_joins(:likeposts).group('posts.id').where(paramshash).order('COUNT(likeposts.id) DESC') :
          @entities = @entity.where(paramshash).order("created_at DESC")
    else
      # you can search by nested attributes here
      POST==@current_entity ?
          @entities= @entity.left_outer_joins(:likeposts).group('posts.id').where(paramshash).order('COUNT(likeposts.id) DESC').offset(params[:offset]).limit(params[:limit]) :
          @entities = @entity.limit(params[:limit]).offset(params[:offset]).where(paramshash).order("created_at DESC")
    end

    if @current_entity == POST
      render json: @entities, httpstatus: getsuccess, exclude: [:description, :descriptiontext, :imageposts]
    else
      render json: @entities, httpstatus: getsuccess
    end
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
      send_mail_notification if @current_entity == USER
      broadcast_notification if @current_entity == STATUS || @current_entity == LIKESTATUS || @current_entity == POST || @current_entity == COMMENTPOST || @current_entity == COMMENTSTATUS || @current_entity == LIKEPOST || @current_entity == LIKECOMMENTPOST || @current_entity == RELATIONSHIP || @current_entity == STATUS # invoke method in child after entity has been saved
      if @current_entity==LIKESTATUS
        render json: @entity, httpstatus: postsuccess, userlike: !@user_like_it, status: :created, location: @entity
      else
        render json: @entity, httpstatus: postsuccess, status: :created, location: @entity
      end
    else
      render json: @entity.errors, httpstatus: postfailed, status: :unprocessable_entity
    end
  end

  private

  def broadcast_notification
    link=''
    message=''
    data=''
    mark=''

    case (@current_entity)
      when POST
        link = "post-detail/#{@entity.id}"
        data = PostSerializer.new(@entity).to_json
        message = "#{@entity.user.username} membuat post baru dengan judul '#{@entity.title}'"
        mark='post'
      when STATUS
        data = StatusSerializer.new(@entity).to_json
        link = "dashboard/#{@entity.user.id}/#status-#{@entity.id}"
        message = "#{@entity.user.username} membuat status baru"
        mark='status'
      when LIKEPOST
        link = "post-detail/#{@entity.post_id}"
        message = "#{@entity.user.username} menyukai postingan anda yang berjudul '#{@entity.post.title}'"
      when LIKECOMMENTPOST
        link = "post-detail/#{@entity.post_id}/#user-commentpost-#{@entity.id}"
        message = "#{@entity.user.username} menyukai commen anda pada komen '#{@entity.commentpost.comment}''"
      when LIKESTATUS
        link = "dashboard/#{@entity.status.user_id}/#status-#{@entity.status.id}"
        message = "#{@entity.user.username} menyukai status anda"
      when COMMENTPOST
        link = "post-detail/#{@entity.post_id}/#user-commentpost-#{@entity.id}"
        message = "#{@entity.user.username} mengomentari postingan anda yang berjudul '#{@entity.post.title}'"
      when COMMENTSTATUS
        link = "dashboard/#{@entity.user_id}/#user-status-#{@entity.id}"
        message = "#{@entity.user.username} mengomentari status anda yang pada status '#{@entity.status.statustext}'"
      when RELATIONSHIP
        link = "dashboard/#{curent_user.id}"
        message = "#{curent_user.username} sekarang mengikuti anda"
      else
        link=""
        message=""
    end

    if @current_entity == RELATIONSHIP
      #check apakah user yang difollow online
      is_user_online = ConnectionList.all.any? { |user| user[:id] == @entity.id.to_s }

      # set notifikasi ke user yang di follow
      @entity.notifications.create!(:user_id => @entity.id, :link => link, :message => message, :userhasresponse_id => curent_user.id)
      BroadcastSingleWorker.perform_async(@entity.id, message, link) if is_user_online && !is_current_user_response

    elsif @current_entity == POST || @current_entity == STATUS
      curent_user.followers.each do |item|
        is_user_online = ConnectionList.all.any? { |user| user[:id] == item.id.to_s }
        if @current_entity == POST
          item.notifications.create!(:user_id => item.id, :link => link, :message => message, :userhasresponse_id => curent_user.id)
        end

        #only user online will be subscribed
        if is_user_online
          BroadcastMultiWorker.perform_async(item.id, message, link, data, mark) if is_user_online && !is_current_user_response
        end

      end

    elsif @current_entity == LIKEPOST || @current_entity == COMMENTPOST
      is_user_online = ConnectionList.all.any? { |user| user[:id] == @entity.post.user_id.to_s } #check apakah user yang punya postingan online
      is_current_user_response = @entity.post.user_id == curent_user.id #check apakah yang like & comment itu yang bikin postingan ini

      user = @entity.post.user
      user.notifications.create!(:user_id => user.id, :link => link, :message => message, :userhasresponse_id => curent_user.id) unless is_current_user_response
      BroadcastSingleWorker.perform_async(@entity.post.user_id, message, link) if is_user_online && !is_current_user_response

    elsif @current_entity == COMMENTSTATUS|| @current_entity == LIKESTATUS
      is_user_online = ConnectionList.all.any? { |user| user[:id] == @entity.status.user_id.to_s } #check apakah user yang punya postingan online
      is_current_user_response = @entity.status.user_id == curent_user.id #check apakah yang comment status itu yang bikin postingan ini

      user = @entity.status.user
      user.notifications.create!(:user_id => user.id, :link => link, :message => message, :userhasresponse_id => curent_user.id) unless is_current_user_response
      BroadcastSingleWorker.perform_async(@entity.status.user_id, message, link) if is_user_online && !is_current_user_response

    elsif @current_entity == LIKECOMMENTPOST
      is_user_online = ConnectionList.all.any? { |user| user[:id] == @entity.commentpost.user_id.to_s } #check apakah user yang punya comment online
      is_current_user_response = @entity.commentpost.user_id == curent_user.id #check apakah yang like comment di post itu yang bikin postingan ini

      user = @entity.commentpost.user
      user.notifications.create!(:user_id => user.id, :link => link, :message => message, :userhasresponse_id => curent_user.id) unless is_current_user_response
      BroadcastSingleWorker.perform_async(@entity.commentpost.user_id, message, link) if is_user_online && !is_current_user_response

    end
  end

  def set_entity
    @entity = @entity.find(params[:id])
  end

  def set_entity_params
    case (@current_entity)
      when USER
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
      when LIKESTATUS
        @entity_params = likestatus_params
    end
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end