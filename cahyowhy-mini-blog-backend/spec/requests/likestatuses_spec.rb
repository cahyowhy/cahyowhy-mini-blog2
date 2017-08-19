require 'rails_helper'

RSpec.describe "Likestatuses", type: :request do
  describe "GET /likestatuses" do
    it "works! (now write some real specs)" do
      get likestatuses_path
      expect(response).to have_http_status(200)
    end
  end
end
