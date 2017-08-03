module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
    end

    private
    def find_verified_user
      headers={}
      headers['Authorization']=request.params[:token]
      current_user = AuthorizeApiRequest.call(headers).result
      if verified_user = current_user
        puts current_user.username
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end