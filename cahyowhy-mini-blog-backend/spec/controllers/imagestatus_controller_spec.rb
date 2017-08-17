require 'rails_helper'

RSpec.describe ImagestatusesController, type: :controller do

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method" do
      let(:model) { create(:imagestatus) }
    end
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", User, :imagestatus do
      let(:model) { create(:imagestatus) }
    end
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", User, :imagestatus do
        let!(:model) { attributes_for(:imagestatus) }
      end
    end

    context "when params is invalid", :imagestatus do
      it_behaves_like "running create method on invalid param", :imagestatus do
        let!(:model) { attributes_for(:imagestatus) }
      end
    end
  end

  describe "UPDATE #put" do
    it_behaves_like "running update method", :imagestatus do
      # in ruby everything start with : its mean symbol
      let!(:model) { create(:imagestatus) }
      let(:model_update) { attributes_for(:imagestatus) }
    end
  end
end