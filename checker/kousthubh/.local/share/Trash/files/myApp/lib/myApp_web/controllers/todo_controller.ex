defmodule MyAppWeb.TodoController do
  use MyAppWeb, :controller

  alias MyApp.Todo_app
  alias MyApp.Todo_app.Todo

  def index(conn, _params) do
    todos = Todo_app.list_todos()
    render(conn, "index.html", todos: todos)
  end

  def new(conn, _params) do
    changeset = Todo_app.change_todo(%Todo{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"todo" => todo_params}) do
    case Todo_app.create_todo(todo_params) do
      {:ok, todo} ->
        conn
        |> put_flash(:info, "Todo created successfully.")
        |> redirect(to: todo_path(conn, :show, todo))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    todo = Todo_app.get_todo!(id)
    render(conn, "show.html", todo: todo)
  end

  def edit(conn, %{"id" => id}) do
    todo = Todo_app.get_todo!(id)
    changeset = Todo_app.change_todo(todo)
    render(conn, "edit.html", todo: todo, changeset: changeset)
  end

  def update(conn, %{"id" => id, "todo" => todo_params}) do
    todo = Todo_app.get_todo!(id)

    case Todo_app.update_todo(todo, todo_params) do
      {:ok, todo} ->
        conn
        |> put_flash(:info, "Todo updated successfully.")
        |> redirect(to: todo_path(conn, :show, todo))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", todo: todo, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    todo = Todo_app.get_todo!(id)
    {:ok, _todo} = Todo_app.delete_todo(todo)

    conn
    |> put_flash(:info, "Todo deleted successfully.")
    |> redirect(to: todo_path(conn, :index))
  end
end
