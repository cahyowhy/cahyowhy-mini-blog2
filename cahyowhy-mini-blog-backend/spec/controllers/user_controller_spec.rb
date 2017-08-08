require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    let!(:user) { create(:user) }
    it "returns http success" do
      get :show, :id => user.id
      expect(response).to have_http_status(:success)
    end
  end

=begin
  describe "POST #create" do
    let!(:user) { attributes_for(:user) }
    it "returns http create" do
      post :create, :user => user
      expect(response).to have_http_status(:created)
    end
  end
=end

  describe "POST #create" do
    let!(:user) { attributes_for(:user) }
    context "when params is valid" do
      it "returns http create" do
        post :create, :user => user
        expect(response).to have_http_status(:created)
      end
    end

    context "when params is'nt valid" do
      it "returns http create" do
        user[:name]=nil
        post :create, :user => user
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end