require 'rails_helper'

RSpec.describe CommentpostsController, type: :controller do

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method" do
      let(:model) { create(:commentpost) }
    end
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", User, :commentpost do
      let(:model) { create(:commentpost) }
    end
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", User, :commentpost do
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
      # in ruby everything start with : its mean symbol
      let!(:model) { create(:commentpost) }
      let(:model_update) { attributes_for(:commentpost) }
    end
  end
end