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

  describe "DELETE #destroy" do
    let!(:user) { create(:user) }

    it "returns http success" do
      request.headers['Authorization'] = token_generator(user.id)
      request.headers['Content-Type'] = "application/json"
      expect { delete :destroy, :id => user.id }.to change { User.count }.by(-1)
    end
  end

  describe "UPDATE #put" do
    let!(:user) { create(:user) }
    let(:user_update) { attributes_for(:user) }

    it "returns http success" do
      # in ruby everything start with : its mean symbol
      user_update.delete(:password) #delete the hash val
      request.headers['Authorization'] = token_generator(user.id)
      request.headers['Content-Type'] = "application/json"

      put :update, :id => user.id, :user => user_update
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    let!(:user) { attributes_for(:user) }
    context "when params is valid" do
      it "returns http create" do
        expect { post :create, :user => user }.to change { User.count }.by(+1)
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