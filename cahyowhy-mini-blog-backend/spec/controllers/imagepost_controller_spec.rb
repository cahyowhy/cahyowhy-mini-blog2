require 'rails_helper'

RSpec.describe ImagepostsController, type: :controller do

  describe "GET #index" do
    context "when query param visible" do
      it_behaves_like "running index method"
    end
  end

  describe "GET #show" do
    it_behaves_like "running show method" do
      let(:model) { create(:imagepost) }
    end
  end

  describe "delete #delete" do
    it_behaves_like "running delete method", User, :imagepost do
      let(:model) { create(:imagepost) }
    end
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", User, :imagepost do
        let!(:model) { attributes_for(:imagepost) }
      end
    end

    context "when params is invalid", :imagepost do
      it_behaves_like "running create method on invalid param", :imagepost do
        let!(:model) { attributes_for(:imagepost) }
      end
    end
  end

  describe "UPDATE #put" do
    it_behaves_like "running update method", :imagepost do
      # in ruby everything start with : its mean symbol
      let!(:model) { create(:imagepost) }
      let(:model_update) { attributes_for(:imagepost) }
    end
  end
end