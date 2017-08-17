require 'rails_helper'

RSpec.describe StatusesController, type: :controller do

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method" do
      let(:model) { create(:statuses) }
    end
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", User, :statuses do
      let(:model) { create(:statuses) }
    end
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", User, :statuses do
        let!(:model) { attributes_for(:statuses) }
      end
    end

    context "when params is invalid", :statuses do
      it_behaves_like "running create method on invalid param", :statuses do
        let!(:model) { attributes_for(:statuses) }
      end
    end
  end

  describe "UPDATE #put" do
    it_behaves_like "running update method", :statuses do
      # in ruby everything start with : its mean symbol
      let!(:model) { create(:statuses) }
      let(:model_update) { attributes_for(:statuses) }
    end
  end
end