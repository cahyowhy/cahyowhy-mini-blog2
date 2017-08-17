require 'rails_helper'

RSpec.describe StatusesController, type: :controller do
  let(:model) { create(:status) }
  let(:class_name) {"status"}
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
    it_behaves_like "running delete method", Status, :status
  end

  describe "create #create" do
    context "when params is valid" do
      it_behaves_like "running create method on valid param", Status, :status do
        let!(:model) { attributes_for(:status) }
      end
    end

    context "when params is invalid", :status do
      it_behaves_like "running create method on invalid param", :status do
        let!(:model) { attributes_for(:status) }
      end
    end
  end

  describe "UPDATE #put" do

    it_behaves_like "running update method", :status do
      let!(:model_update) { attributes_for(:status) }
    end
  end
end