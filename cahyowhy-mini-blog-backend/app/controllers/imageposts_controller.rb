class ImagepostsController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]

  private
  def init_value
    super(IMAGEPOST)
  end

  # Only allow a trusted parameter "white list" through.
  def imagepost_params
    params.require(:imagepost).permit(:user_id, :post_id, :imageurl)
  end
end
