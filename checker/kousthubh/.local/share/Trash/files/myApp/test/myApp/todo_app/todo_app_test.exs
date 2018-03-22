defmodule MyApp.Todo_appTest do
  use MyApp.DataCase

  alias MyApp.Todo_app

  describe "todos" do
    alias MyApp.Todo_app.Todo

    @valid_attrs %{done: true, done_time: ~T[14:00:00.000000], task_body: "some task_body", task_title: "some task_title"}
    @update_attrs %{done: false, done_time: ~T[15:01:01.000000], task_body: "some updated task_body", task_title: "some updated task_title"}
    @invalid_attrs %{done: nil, done_time: nil, task_body: nil, task_title: nil}

    def todo_fixture(attrs \\ %{}) do
      {:ok, todo} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Todo_app.create_todo()

      todo
    end

    test "list_todos/0 returns all todos" do
      todo = todo_fixture()
      assert Todo_app.list_todos() == [todo]
    end

    test "get_todo!/1 returns the todo with given id" do
      todo = todo_fixture()
      assert Todo_app.get_todo!(todo.id) == todo
    end

    test "create_todo/1 with valid data creates a todo" do
      assert {:ok, %Todo{} = todo} = Todo_app.create_todo(@valid_attrs)
      assert todo.done == true
      assert todo.done_time == ~T[14:00:00.000000]
      assert todo.task_body == "some task_body"
      assert todo.task_title == "some task_title"
    end

    test "create_todo/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Todo_app.create_todo(@invalid_attrs)
    end

    test "update_todo/2 with valid data updates the todo" do
      todo = todo_fixture()
      assert {:ok, todo} = Todo_app.update_todo(todo, @update_attrs)
      assert %Todo{} = todo
      assert todo.done == false
      assert todo.done_time == ~T[15:01:01.000000]
      assert todo.task_body == "some updated task_body"
      assert todo.task_title == "some updated task_title"
    end

    test "update_todo/2 with invalid data returns error changeset" do
      todo = todo_fixture()
      assert {:error, %Ecto.Changeset{}} = Todo_app.update_todo(todo, @invalid_attrs)
      assert todo == Todo_app.get_todo!(todo.id)
    end

    test "delete_todo/1 deletes the todo" do
      todo = todo_fixture()
      assert {:ok, %Todo{}} = Todo_app.delete_todo(todo)
      assert_raise Ecto.NoResultsError, fn -> Todo_app.get_todo!(todo.id) end
    end

    test "change_todo/1 returns a todo changeset" do
      todo = todo_fixture()
      assert %Ecto.Changeset{} = Todo_app.change_todo(todo)
    end
  end

  describe "todos" do
    alias MyApp.Todo_app.Todo

    @valid_attrs %{assigned_by: "some assigned_by", done: true, done_time: ~T[14:00:00.000000], task_body: "some task_body", task_title: "some task_title"}
    @update_attrs %{assigned_by: "some updated assigned_by", done: false, done_time: ~T[15:01:01.000000], task_body: "some updated task_body", task_title: "some updated task_title"}
    @invalid_attrs %{assigned_by: nil, done: nil, done_time: nil, task_body: nil, task_title: nil}

    def todo_fixture(attrs \\ %{}) do
      {:ok, todo} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Todo_app.create_todo()

      todo
    end

    test "list_todos/0 returns all todos" do
      todo = todo_fixture()
      assert Todo_app.list_todos() == [todo]
    end

    test "get_todo!/1 returns the todo with given id" do
      todo = todo_fixture()
      assert Todo_app.get_todo!(todo.id) == todo
    end

    test "create_todo/1 with valid data creates a todo" do
      assert {:ok, %Todo{} = todo} = Todo_app.create_todo(@valid_attrs)
      assert todo.assigned_by == "some assigned_by"
      assert todo.done == true
      assert todo.done_time == ~T[14:00:00.000000]
      assert todo.task_body == "some task_body"
      assert todo.task_title == "some task_title"
    end

    test "create_todo/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Todo_app.create_todo(@invalid_attrs)
    end

    test "update_todo/2 with valid data updates the todo" do
      todo = todo_fixture()
      assert {:ok, todo} = Todo_app.update_todo(todo, @update_attrs)
      assert %Todo{} = todo
      assert todo.assigned_by == "some updated assigned_by"
      assert todo.done == false
      assert todo.done_time == ~T[15:01:01.000000]
      assert todo.task_body == "some updated task_body"
      assert todo.task_title == "some updated task_title"
    end

    test "update_todo/2 with invalid data returns error changeset" do
      todo = todo_fixture()
      assert {:error, %Ecto.Changeset{}} = Todo_app.update_todo(todo, @invalid_attrs)
      assert todo == Todo_app.get_todo!(todo.id)
    end

    test "delete_todo/1 deletes the todo" do
      todo = todo_fixture()
      assert {:ok, %Todo{}} = Todo_app.delete_todo(todo)
      assert_raise Ecto.NoResultsError, fn -> Todo_app.get_todo!(todo.id) end
    end

    test "change_todo/1 returns a todo changeset" do
      todo = todo_fixture()
      assert %Ecto.Changeset{} = Todo_app.change_todo(todo)
    end
  end
end
