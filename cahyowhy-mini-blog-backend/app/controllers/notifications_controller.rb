class NotificationsController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:show, :update, :destroy]
  # GET /notifications

  # POST /notifications
  def create
    @notification = Notification.new(notification_params)

    if @notification.save
      render json: @notification, status: :created, location: @notification
    else
      render json: @notification.errors, status: :unprocessable_entity
    end
  end

  private
  def init_value
    super(NOTIFICATION)
  end

  # def set_notification
  #   @notification = Notification.find(params[:id])
  # end

  # Only allow a trusted parameter "white list" through.
  def notification_params
    params.require(:notification).permit(:user_id, :link, :message, :userhasresponse_id)
  end
end
