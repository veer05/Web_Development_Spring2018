defmodule MyApp.Tracker.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias MyApp.Tracker.Task


  schema "tasks" do
    field :done, :boolean, default: false
    field :done_time, :time
    field :task_body, :string
    field :task_title, :string
    field :assigned_by_id, :id
    field :assigned_to_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:task_title, :task_body, :done, :done_time])
    |> validate_required([:task_title, :task_body, :done, :done_time])
  end
end
