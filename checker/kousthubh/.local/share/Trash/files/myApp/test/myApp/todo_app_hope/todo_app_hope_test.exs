defmodule MyApp.Todo_app_hopeTest do
  use MyApp.DataCase

  alias MyApp.Todo_app_hope

  describe "works" do
    alias MyApp.Todo_app_hope.Work

    @valid_attrs %{assigned_by: "some assigned_by", done: true, done_time: ~T[14:00:00.000000], task_body: "some task_body", task_title: "some task_title"}
    @update_attrs %{assigned_by: "some updated assigned_by", done: false, done_time: ~T[15:01:01.000000], task_body: "some updated task_body", task_title: "some updated task_title"}
    @invalid_attrs %{assigned_by: nil, done: nil, done_time: nil, task_body: nil, task_title: nil}

    def work_fixture(attrs \\ %{}) do
      {:ok, work} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Todo_app_hope.create_work()

      work
    end

    test "list_works/0 returns all works" do
      work = work_fixture()
      assert Todo_app_hope.list_works() == [work]
    end

    test "get_work!/1 returns the work with given id" do
      work = work_fixture()
      assert Todo_app_hope.get_work!(work.id) == work
    end

    test "create_work/1 with valid data creates a work" do
      assert {:ok, %Work{} = work} = Todo_app_hope.create_work(@valid_attrs)
      assert work.assigned_by == "some assigned_by"
      assert work.done == true
      assert work.done_time == ~T[14:00:00.000000]
      assert work.task_body == "some task_body"
      assert work.task_title == "some task_title"
    end

    test "create_work/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Todo_app_hope.create_work(@invalid_attrs)
    end

    test "update_work/2 with valid data updates the work" do
      work = work_fixture()
      assert {:ok, work} = Todo_app_hope.update_work(work, @update_attrs)
      assert %Work{} = work
      assert work.assigned_by == "some updated assigned_by"
      assert work.done == false
      assert work.done_time == ~T[15:01:01.000000]
      assert work.task_body == "some updated task_body"
      assert work.task_title == "some updated task_title"
    end

    test "update_work/2 with invalid data returns error changeset" do
      work = work_fixture()
      assert {:error, %Ecto.Changeset{}} = Todo_app_hope.update_work(work, @invalid_attrs)
      assert work == Todo_app_hope.get_work!(work.id)
    end

    test "delete_work/1 deletes the work" do
      work = work_fixture()
      assert {:ok, %Work{}} = Todo_app_hope.delete_work(work)
      assert_raise Ecto.NoResultsError, fn -> Todo_app_hope.get_work!(work.id) end
    end

    test "change_work/1 returns a work changeset" do
      work = work_fixture()
      assert %Ecto.Changeset{} = Todo_app_hope.change_work(work)
    end
  end
end
