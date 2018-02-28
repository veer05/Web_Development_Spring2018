defmodule TaskTracker.Tracker.Task do
  use Ecto.Schema
  import Ecto.Changeset
  alias TaskTracker.Tracker.Task


  schema "tasks" do
    # Assigned here I take it as a string but when I pass it from the 
    # frontend it will ALWAYS be a valid correct email address which 
    # will be unique to each user
    field :assigned_to, :string
    # Boolean to represent if the task has been completed or not
    field :completed, :boolean, default: false
    # Task Desc is a text field which holds text value
    field :task_desc, :string
    # Task Title is a string
    field :task_title, :string
    # Time spent on the task
    field :time_taken, :integer, default: 0 
    # Adding ManagerID to the field, 
    #Every user can choose his manager id
    #field :user_id, :id
    belongs_to :user, TaskTracker.Accounts.User
    has_many :timetracks, TaskTracker.Tracker.TimeTrack
    timestamps()
  end

  @doc false
  def changeset(%Task{} = task, attrs) do
    task
    |> cast(attrs, [:task_title, :task_desc, :completed, :assigned_to, :time_taken, :user_id])
    |> validate_required([:task_title, :task_desc, :completed, :assigned_to, :time_taken, :user_id])
  end

end