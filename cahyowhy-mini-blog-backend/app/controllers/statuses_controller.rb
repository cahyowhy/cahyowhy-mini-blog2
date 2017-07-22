class StatusesController < BaseController
  before_action :set_entity, only: [:show, :update, :destroy]
  before_action :delete_imagestatuses, only: [:destroy]
  before_action :check_imagestatuses_params, only: [:update]
  before_action :authenticate_request, only: [:destroy, :create, :update]

  def after_create
    params[:status][:imagestatuses].each do |item|
      @entity.imagestatuses.create!(:imageurl => item[:imageurl], :user_id => curent_user.id)
    end
  end

  private
  def init_value
    super(STATUS)
  end

  def delete_imagestatuses
    @entity.imagestatuses.each do |item|
      item.destroy
    end
  end

  # Only allow a trusted parameter "white list" through.
  def status_params
    params.require(:status).permit(:user_id, :statustext, :imagestatuses)
  end

  # check weather if the imagestatuses params is visible, render a json
  def check_imagestatuses_params
    unless params[:status][:imagestatuses].blank?
      render json: {message:"sory, we can't update image at this time", httpstatus:updatefailed}
    end
  end

  # do authentication
  def authenticate_request
    authenticateUserModule
  end
end