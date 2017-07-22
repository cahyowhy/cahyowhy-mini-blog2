class ImagestatusesController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]

  private
  def init_value
    super(IMAGESTATUS)
  end

  # Only allow a trusted parameter "white list" through.
  def imagestatus_params
    params.require(:imagestatus).permit(:user_id, :status_id, :imageurl)
  end
end
