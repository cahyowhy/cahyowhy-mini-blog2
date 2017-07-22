class CommentpostsController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:destroy, :create, :update]

  private
  def init_value
    super(COMMENTPOST)
  end

  # Only allow a trusted parameter "white list" through.
  def commentpost_params
    params.require(:commentpost).permit(:comment, :user_id, :post_id)
  end
end
