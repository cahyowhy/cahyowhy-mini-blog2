module Searchable
  extend ActiveSupport::Concern
  module ClassMethods
    def setting_index(arguments)
      settings index: {number_of_shards: 3} do
        mapping dynamic: true do
          arguments.each do |argument|
            indexes argument[:attr], type: argument[:type]
          end
        end
      end
    end
  end

  included do
    include Elasticsearch::Model
    include Elasticsearch::Model::Callbacks
    index_name Rails.application.class.parent_name.underscore+"_"+self.name.downcase
    puts Rails.application.class.parent_name.underscore+"_"+self.name.downcase
    document_type self.name.downcase
  end
end