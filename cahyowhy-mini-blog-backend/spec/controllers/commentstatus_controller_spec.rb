require 'rails_helper'

RSpec.describe CommentstatusesController, type: :controller do
  let(:model) { create(:commentstatus) }
  let(:class_name) { "commentstatus" }
  let(:user) { create(:user) }
  let(:status) { create(:status) }

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method"
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", Commentstatus, :commentstatus
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", Commentstatus, :commentstatus do
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
      let!(:model_update) { attributes_for(:commentstatus) }
    end
  end
end