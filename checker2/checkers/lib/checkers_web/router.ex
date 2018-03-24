defmodule CheckersWeb.Router do
  use CheckersWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", CheckersWeb do
    pipe_through :browser # Use the default browser stack

  #get "/game", PageController, :game

  get "/", PageController, :index
    # Adding route for game
    get "/game/:game", PageController, :game
  end

  # Other scopes may use custom stacks.
  # scope "/api", CheckersWeb do
  #   pipe_through :api
  # end
end
