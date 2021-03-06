class ImageUploader < CarrierWave::Uploader::Base

  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick
  include Cloudinary::CarrierWave
  # storage :file

  # if using multi versions
  # version :main do
  #   process :store_dimensions
  #   process :resize_to_fit => [120, 120]
  # end

  # doesnt stracth image
  process :resize_to_fit => [560, 560]
  process :convert  => "jpg"
  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  # def store_dir
  #   "uploads/#{model.class.to_s.underscore}/#{mounted_as}"
  # end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  # process scale: [200, 300]
  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  # version :thumb do
  #   process resize_to_fit: [50, 50]
  # end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def public_id
    return original_filename
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
=begin
  def filename
    Time.new.to_i.to_s+original_filename
  end
=end

  # store width height
  # private
  # def store_dimensions
  #   image = MiniMagick::Image.open(self.file.file)
  #   @image_width = image[:width]
  #   @image_height = image[:height]
  #   if (@image_height>@image_width)
  #     ratio = @image_height>560 ? 560.0/@image_height : 1.0
  #     @image_height = @image_height * ratio
  #     @image_width = @image_width * ratio
  #   else
  #     ratio = @image_width>560 ? 560.0/@image_width : 1.0
  #     @image_height = @image_height * ratio
  #     @image_width = @image_width * ratio
  #   end
  #   puts "#{@image_width.to_i.to_s} #{@image_height.to_i.to_s}"
  # end
end