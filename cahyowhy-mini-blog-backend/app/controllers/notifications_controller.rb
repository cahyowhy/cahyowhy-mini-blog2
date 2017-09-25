class NotificationsController < BaseController
  before_action :set_entity, only: [:show, :destroy]
  before_action :authenticate_request, only: [:show, :destroy, :index]

  private
  def init_value
    super(NOTIFICATION)
  end

  # Only allow a trusted parameter "white list" through.
  def notification_params
    params.require(:notification).permit(:user_id, :link, :message, :userhasresponse_id)
  end
end
