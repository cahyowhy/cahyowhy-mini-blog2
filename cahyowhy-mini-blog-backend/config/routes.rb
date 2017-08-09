Rails.application.routes.draw do
  require 'sidekiq/web'
  mount ActionCable.server => '/cable'
  mount Sidekiq::Web => '/sidekiq'
  resources :commentstatuses
  resources :notifications, only: [:create, :destroy, :show, :index]
  resources :imageposts
  resources :imagestatuses
  resources :statuses
  resources :likeposts, only: [:create, :index, :show]
  resources :likecommentposts, only: [:create, :index, :show]
  resources :commentposts
  resources :images, only: [:create, :index, :show, :destroy]
  resources :posts
  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :relationships, only: [:create]
  post 'authenticate', to: 'authentication#authenticate'
  get 'posts/next/:id', to: 'posts#show_post_next'
  get 'posts/categories/all', to: 'posts#print_category'
  get 'posts/prev/:id', to: 'posts#show_post_prev'
  get 'auth', to: 'authtoken#auth_token'
  get 'timelines', to: 'timeline#index' #iseh ngebug jancuk
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
