class CommentstatusesController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]
  before_action :authenticate_request, only: [:destroy, :create, :update]

  private
  def init_value
    super(COMMENTSTATUS)
  end

  # Only allow a trusted parameter "white list" through.
  def commentstatus_params
    params.require(:commentstatus).permit(:comment, :user_id, :status_id)
  end
end
