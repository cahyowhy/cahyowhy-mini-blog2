require 'rails_helper'

RSpec.describe CommentpostsController, type: :controller do
  let(:model) { create(:commentpost) }
  let(:class_name) { "commentpost" }
  let(:user) { create(:user) }
  let(:post) { create(:post) }

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method"
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", Commentpost, :commentpost
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", Commentpost, :commentpost do
        let!(:model) { attributes_for(:commentpost) }
      end
    end

    context "when params is invalid", :commentpost do
      it_behaves_like "running create method on invalid param", :commentpost do
        let!(:model) { attributes_for(:commentpost) }
      end
    end
  end

  describe "UPDATE #put" do

    it_behaves_like "running update method", :commentpost do
      let!(:model_update) { attributes_for(:commentpost) }
    end
  end
end