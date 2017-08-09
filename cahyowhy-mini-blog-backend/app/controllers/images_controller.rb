class ImagesController < BaseController
  before_action :set_entity, only: [:show, :destroy]
  before_action :authenticate_request, only: [:destroy, :create]
  before_action :remove_img, only: [:destroy]

  # POST /images
  def create
    @multi_images = Array.new
    image_params[:imagepath_data].each.with_index do |file, index|
      @single_image = Image.new(:path => file, :user_id => curent_user.id)
      if @single_image.save
        @multi_images.push(@single_image)
        if image_params[:imagepath_data].length == index+1
          render json: @multi_images, httpstatus: postsuccess
          break
        end
      else
        render json: {message: "SOME FILE CAN'T BE SAVED!", status: postfailed}
        break
      end
    end
  end

  private
  def init_value
    super(IMAGE)
  end

  def remove_img
    param = @entity.path.url
    File.delete("#{Rails.root}/public#{param}")
  end

  # Only allow a trusted parameter "white list" through.
  def image_params
    params.require(:image).permit(:imagepath_data => []).merge(user: curent_user)
  end
end
