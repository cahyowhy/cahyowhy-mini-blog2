require 'rails_helper'

RSpec.describe PostsController, type: :controller do
  let(:model) { create(:post) }
  let(:class_name) {"post"}
  let(:user) { create(:user) }

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method"
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", Post, :post
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", Post, :post do
        let!(:model) { attributes_for(:post) }
      end
    end

    context "when params is invalid", :post do
      it_behaves_like "running create method on invalid param", :post do
        let!(:model) { attributes_for(:post) }
      end
    end
  end

  describe "UPDATE #put" do

    it_behaves_like "running update method", :post do
      let!(:model_update) { attributes_for(:post) }
    end
  end
end