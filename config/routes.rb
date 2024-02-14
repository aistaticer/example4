Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'registrations'
  }
  get 'users/new'
  get 'users/create'
  get 'users/show'

  resources :recipes, only: [:index, :show, :new, :create]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #resources :users, only: [:new, :create, :show]
end
