defmodule TaskTrackerWeb.PageController do
  use TaskTrackerWeb, :controller
  
  alias TaskTracker.Tracker
  alias TaskTracker.Tracker.Task
  alias TaskTracker.Accounts
  alias TaskTracker.Accounts.User

  def index(conn, _params) do
    render conn, "index.html"
  end


  def feed(conn, _params) do
  	tasks = Tracker.list_tasks()
  	users = Accounts.list_users()
  	new_task = %Task{ user_id: conn.assigns[:current_user].id }
  	changeset = Tracker.change_task(new_task)
    render conn, "feed.html" , tasks: tasks , changeset: changeset, users: users
  end


end
