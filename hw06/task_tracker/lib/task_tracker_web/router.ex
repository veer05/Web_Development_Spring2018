defmodule TaskTrackerWeb.Router do
  use TaskTrackerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :get_current_user
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  def get_current_user(conn, _params) do
    # TODO: Move this function out of the router module.
    user_id = get_session(conn, :user_id)
    user = TaskTracker.Accounts.get_user(user_id || -1)
    assign(conn, :current_user, user)
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TaskTrackerWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    # Adding route to the User resource
    resources "/users", UserController
    # Adding route to the Task resource
    resources "/tasks", TaskController
    # Handle displaying the feed
    get "/feed", PageController, :feed

    # Session route referenced from Nat's Notes   
    post "/session", SessionController, :create
    delete "/session", SessionController, :delete
  end

  # Other scopes may use custom stacks.
  # scope "/api", TaskTrackerWeb do
  #   pipe_through :api
  # end
end
