defmodule TaskTracker.TrackerTest do
  use TaskTracker.DataCase

  alias TaskTracker.Tracker

  describe "tasks" do
    alias TaskTracker.Tracker.Task

    @valid_attrs %{assigned_to: "some assigned_to", completed: true, task_desc: "some task_desc", task_title: "some task_title", time_taken: 42}
    @update_attrs %{assigned_to: "some updated assigned_to", completed: false, task_desc: "some updated task_desc", task_title: "some updated task_title", time_taken: 43}
    @invalid_attrs %{assigned_to: nil, completed: nil, task_desc: nil, task_title: nil, time_taken: nil}

    def task_fixture(attrs \\ %{}) do
      {:ok, task} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Tracker.create_task()

      task
    end

    test "list_tasks/0 returns all tasks" do
      task = task_fixture()
      assert Tracker.list_tasks() == [task]
    end

    test "get_task!/1 returns the task with given id" do
      task = task_fixture()
      assert Tracker.get_task!(task.id) == task
    end

    test "create_task/1 with valid data creates a task" do
      assert {:ok, %Task{} = task} = Tracker.create_task(@valid_attrs)
      assert task.assigned_to == "some assigned_to"
      assert task.completed == true
      assert task.task_desc == "some task_desc"
      assert task.task_title == "some task_title"
      assert task.time_taken == 42
    end

    test "create_task/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Tracker.create_task(@invalid_attrs)
    end

    test "update_task/2 with valid data updates the task" do
      task = task_fixture()
      assert {:ok, task} = Tracker.update_task(task, @update_attrs)
      assert %Task{} = task
      assert task.assigned_to == "some updated assigned_to"
      assert task.completed == false
      assert task.task_desc == "some updated task_desc"
      assert task.task_title == "some updated task_title"
      assert task.time_taken == 43
    end

    test "update_task/2 with invalid data returns error changeset" do
      task = task_fixture()
      assert {:error, %Ecto.Changeset{}} = Tracker.update_task(task, @invalid_attrs)
      assert task == Tracker.get_task!(task.id)
    end

    test "delete_task/1 deletes the task" do
      task = task_fixture()
      assert {:ok, %Task{}} = Tracker.delete_task(task)
      assert_raise Ecto.NoResultsError, fn -> Tracker.get_task!(task.id) end
    end

    test "change_task/1 returns a task changeset" do
      task = task_fixture()
      assert %Ecto.Changeset{} = Tracker.change_task(task)
    end
  end
end
