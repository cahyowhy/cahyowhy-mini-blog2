module Searchable
  extend ActiveSupport::Concern

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks
    index_name Rails.application.class.parent_name.underscore
    puts Rails.application.class.parent_name.underscore
    document_type self.name.downcase

    # you get an error if this shit run first
    module ClassMethods
      def setting_index(arguments)
        settings index: {number_of_shards: 1} do

          mapping dynamic: false do
            arguments.each do |argument|
              indexes argument[:attr], type: argument[:type]
            end
            # indexes :username, type: :string
            # indexes :name, type: :string
          end

          # mapping dynamic: false do
          #   indexes :username, type: :string
          #   indexes :name, type: :string
          # end
        end
      end
    end

    # you are'nt get an error but you can't pass the argumen in this shit
    # implementing elasticsearch start here
    # settings index: {number_of_shards: 1} do
    #   mapping dynamic: false do
    #     indexes :username, type: :string
    #     indexes :name, type: :string
    #   end
    # end
  end
end