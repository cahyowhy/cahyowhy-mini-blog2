class SearchController < ApplicationController
  def search
    @results = User.search(params[:query].present? ? params[:query] : '*').records
    render json: @results, httpstatus: getsuccess
  end
end