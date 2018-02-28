defmodule TaskTracker.Tracker.TimeTrack do
  use Ecto.Schema
  import Ecto.Changeset
  alias TaskTracker.Tracker.TimeTrack


  schema "timetracks" do
    field :end_time, :naive_datetime
    field :start_time, :naive_datetime
    #field :task_id, :id
    belongs_to :task, TaskTracker.Tracker.Task


    timestamps()
  end

  @doc false
  def changeset(%TimeTrack{} = time_track, attrs) do
    time_track
    |> cast(attrs, [:start_time, :end_time, :task_id])
    |> validate_required([:task_id])
  end
end
