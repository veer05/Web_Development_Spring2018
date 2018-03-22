defmodule MyAppWeb.PageController do
  use MyAppWeb, :controller

  alias MyApp.Accounts
  alias MyApp.Accounts.User
  
  alias MyApp.Todo_app_hope
  alias MyApp.Todo_app_hope.Work

  def index(conn, _params) do
    render conn, "index.html"
  end

  def feed(conn, _params) do
  	#render conn, "feed.html"
  	users = Accounts.list_users()
    works = Todo_app_hope.list_works()
    #new_work = %Work{ user_id: conn.assigns[:current_user].id }
    new_work = %Work{ assigned_by: conn.assigns[:current_user].name }
    changeset = Todo_app_hope.change_work(new_work)
    render conn, "feed.html", works: works, changeset: changeset, users: users 
  end
end
