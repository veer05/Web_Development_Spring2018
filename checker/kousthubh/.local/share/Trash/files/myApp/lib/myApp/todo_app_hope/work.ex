defmodule MyApp.Todo_app_hope.Work do
  use Ecto.Schema
  import Ecto.Changeset
  alias MyApp.Todo_app_hope.Work


  schema "works" do
    field :assigned_by, :string
    field :done, :boolean, default: false
    field :done_time, :time
    field :task_body, :string
    field :task_title, :string
    #field :user_id, :id
    belongs_to :user, MyApp.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(%Work{} = work, attrs) do
    work
    |> cast(attrs, [:task_title, :task_body, :assigned_by, :done, :done_time, :user_id])
    |> validate_required([:task_title, :task_body, :assigned_by, :done, :done_time, :user_id])
  end
end
