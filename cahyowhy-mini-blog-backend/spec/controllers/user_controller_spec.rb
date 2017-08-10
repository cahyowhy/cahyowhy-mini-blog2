require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe "GET #index" do
    it_behaves_like "running index method"
  end

  describe "GET #show" do
    it_behaves_like "running show method" do
      let(:model) { create(:user) }
    end
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", User, :user do
      let(:model) { create(:user) }
    end
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", User, :user do
        let!(:model) { attributes_for(:user) }
      end
    end

    context "when params is invalid", :user do
      it_behaves_like "running create method on invalid param", :user do
        let!(:model) { attributes_for(:user) }
      end
    end
  end

  describe "UPDATE #put" do
    it_behaves_like "running update method", :user do
      # in ruby everything start with : its mean symbol
      let!(:model) { create(:user) }
      let(:model_update) { attributes_for(:user) }
    end
  end
end