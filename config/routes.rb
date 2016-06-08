Rails.application.routes.draw do

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :lyric, only: [:create, :destroy, :show, :index]
    resource :annotation, only: [:create, :update, :destroy]
    get "/search/:query", to: 'lyric#search'
  end

  get '/auth/:provider/callback', to: 'api/sessions#twitter_create'

  root "static_pages#root"

end
