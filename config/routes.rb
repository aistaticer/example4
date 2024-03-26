Rails.application.routes.draw do
  get 'static_pages/top'
  devise_for :users, controllers: {
    registrations: 'registrations'
  }

  resources :users, only: [:show]

  resources :recipes do
    resource :likes, only: [:create, :destroy]
    resources :comments, only: [:create, :destroy]
  end  

  root 'static_pages#top'

  resources :recipes, only: [:index, :show, :new, :create, :destroy, :edit, :update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  #resources :users, only: [:new, :create, :show]
end
