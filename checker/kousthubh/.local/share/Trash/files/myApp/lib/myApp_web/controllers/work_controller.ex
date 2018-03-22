defmodule MyAppWeb.WorkController do
  use MyAppWeb, :controller

  alias MyApp.Todo_app_hope
  alias MyApp.Todo_app_hope.Work

  alias MyApp.Accounts
  alias MyApp.Accounts.User


  def index(conn, _params) do
    works = Todo_app_hope.list_works()
    render(conn, "index.html", works: works)
  end

  #change made
  def new(conn, _params) do

    changeset = Todo_app_hope.change_work(%Work{})
    users = Accounts.list_users()
    render(conn, "new.html", changeset: changeset, users: users)
   # render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"work" => work_params}) do
    case Todo_app_hope.create_work(work_params) do
      {:ok, work} ->
        conn
        |> put_flash(:info, "Work created successfully.")
        |> redirect(to: work_path(conn, :show, work))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    work = Todo_app_hope.get_work!(id)
    render(conn, "show.html", work: work)
  end

  def edit(conn, %{"id" => id}) do

    work = Todo_app_hope.get_work!(id)
    users = Accounts.list_users()
    changeset = Todo_app_hope.change_work(work)
    render(conn, "edit.html", work: work, changeset: changeset, users: users)
  end

  def update(conn, %{"id" => id, "work" => work_params}) do
    work = Todo_app_hope.get_work!(id)

    case Todo_app_hope.update_work(work, work_params) do
      {:ok, work} ->
        conn
        |> put_flash(:info, "Work updated successfully.")
        |> redirect(to: work_path(conn, :show, work))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", work: work, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    work = Todo_app_hope.get_work!(id)
    {:ok, _work} = Todo_app_hope.delete_work(work)

    conn
    |> put_flash(:info, "Work deleted successfully.")
    |> redirect(to: work_path(conn, :index))
  end
end
