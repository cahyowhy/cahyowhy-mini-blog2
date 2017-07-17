Rails.application.routes.draw do
  resources :postcommentlikes
  resources :postcomments
  resources :commentposts
  resources :images
  resources :posts
  resources :users
  post 'authenticate', to: 'authentication#authenticate'
  get 'images/user/:id', to: 'images#show_image_by_user'
  get 'posts/user/:id', to: 'posts#show_post_by_user'
  get 'commentposts/post/:id', to: 'commentposts#show_commentpost_by_post'
  get 'posts/next/:id', to: 'posts#show_post_next'
  get 'posts/prev/:id', to: 'posts#show_post_prev'
  get 'auth', to: 'authtoken#auth_token'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
