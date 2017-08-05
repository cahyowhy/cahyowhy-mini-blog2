class SearchController < ApplicationController
  def search
    puts params[:query]
    unless params[:query].blank?
      #this search method is implementing to user model seach self.search
      @results = User.search(params[:query])
      render json: @results, httpstatus: getsuccess
    end
  end
end