Rails.application.routes.draw do
  require 'sidekiq/web'
  mount ActionCable.server => '/cable'
  mount Sidekiq::Web => '/sidekiq'
  resources :users do
    member do
      get :following, :followers
    end
  end
  resources :likestatuses, only: [:create, :index, :show, :print_emoticon]
  resources :posts
  resources :statuses
  resources :commentstatuses
  resources :imageposts
  resources :imagestatuses
  resources :commentposts
  resources :notifications, only: [:create, :destroy, :show, :index]
  resources :likeposts, only: [:create, :index, :show]
  resources :likecommentposts, only: [:create, :index, :show]
  resources :images, only: [:create, :index, :show, :destroy]
  resources :relationships, only: [:create, :destroy]
  post 'authenticate', to: 'authentication#authenticate'
  post 'authenticate/facebook', to: 'authentication#authenticate_facebook'
  get 'posts/next/:id', to: 'posts#show_post_next'
  get 'users/isfollow/:id', to: 'users#check_user_follow'
  get 'posts/categories/all', to: 'posts#print_category'
  get 'likestatuses/emoticons/all', to: 'likestatuses#print_emoticon'
  get 'posts/prev/:id', to: 'posts#show_post_prev'
  get 'auth', to: 'authtoken#auth_token'
  get 'timelines', to: 'timeline#index' 
  get 'relationships/show_id_by_userfollow', to: 'relationships#show_id_by_userfollow' 
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
