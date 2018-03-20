Rails.application.routes.draw do
  resources :emailers
  resources :friendlists
  resources :eventlists
  resources :categories
  resources :invites
  resources :events
  resources :friend_categories
  resources :friendships
  resources :users

  post '/login' => "users#login"
  post '/events/:id' => "events#update"
  patch '/events/:id' => "events#update"
  patch '/invites/:id' => "invites#update"
  delete '/events/:id' => "events#destroy"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
