require 'rails_helper'

RSpec.describe CommentstatusesController, type: :controller do

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method" do
      let(:model) { create(:commentstatus) }
    end
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", User, :commentstatus do
      let(:model) { create(:commentstatus) }
    end
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", User, :commentstatus do
        let!(:model) { attributes_for(:commentstatus) }
      end
    end

    context "when params is invalid", :commentstatus do
      it_behaves_like "running create method on invalid param", :commentstatus do
        let!(:model) { attributes_for(:commentstatus) }
      end
    end
  end

  describe "UPDATE #put" do
    it_behaves_like "running update method", :commentstatus do
      # in ruby everything start with : its mean symbol
      let!(:model) { create(:commentstatus) }
      let(:model_update) { attributes_for(:commentstatus) }
    end
  end
end