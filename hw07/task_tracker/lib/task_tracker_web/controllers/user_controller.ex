defmodule TaskTrackerWeb.UserController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Accounts
  alias TaskTracker.Accounts.User

  def index(conn, _params) do
    #users = Accounts.list_users()
    users = Accounts.manager_and_subordinate(conn.assigns[:current_user].id)
    main_user = Accounts.get_user(conn.assigns[:current_user].id)
    render(conn, "profile.html", users: users, main_user: main_user)
  end

  def new(conn, _params) do
    users = Accounts.list_users()
    changeset = Accounts.change_user(%User{})
    render(conn, "new.html", changeset: changeset, users: users)
  end

  def create(conn, %{"user" => user_params}) do
    users = Accounts.list_users()
    case Accounts.create_user(user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User created successfully.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset, users: users)
    end
  end

  def show(conn, %{"id" => id}) do
    users = Accounts.list_users()
    user = Accounts.get_user(id)
    if user.manager_id == nil do
          muser = %User{name: "Does not have a Manager"}   
    else
          muser = Accounts.get_user(user.manager_id)  
    end
    #IO.inspect(muser)
    render(conn, "show.html", user: user, users: users, muser: muser)
  end

  def edit(conn, %{"id" => id}) do
    users = Accounts.list_users()
    user = Accounts.get_user(id)
    changeset = Accounts.change_user(user)
    render(conn, "edit.html", user: user, changeset: changeset, users: users)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user(id)
    users = Accounts.list_users()
    case Accounts.update_user(user, user_params) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User updated successfully.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset, users: users)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user(id)
    {:ok, _user} = Accounts.delete_user(user)

    conn
    |> put_flash(:info, "User deleted successfully.")
    |> redirect(to: user_path(conn, :profile))
  end
end
