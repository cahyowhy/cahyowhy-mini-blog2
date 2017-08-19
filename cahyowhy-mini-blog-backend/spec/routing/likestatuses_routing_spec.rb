require "rails_helper"

RSpec.describe LikestatusesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/likestatuses").to route_to("likestatuses#index")
    end

    it "routes to #new" do
      expect(:get => "/likestatuses/new").to route_to("likestatuses#new")
    end

    it "routes to #show" do
      expect(:get => "/likestatuses/1").to route_to("likestatuses#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/likestatuses/1/edit").to route_to("likestatuses#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/likestatuses").to route_to("likestatuses#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/likestatuses/1").to route_to("likestatuses#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/likestatuses/1").to route_to("likestatuses#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/likestatuses/1").to route_to("likestatuses#destroy", :id => "1")
    end

  end
end
