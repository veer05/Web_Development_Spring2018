defmodule MyApp.Todo_app.Todo do
  use Ecto.Schema
  import Ecto.Changeset
  alias MyApp.Todo_app.Todo


  schema "todos" do
    field :assigned_by, :string
    field :done, :boolean, default: false
    field :done_time, :time
    field :task_body, :string
    field :task_title, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(%Todo{} = todo, attrs) do
    todo
    |> cast(attrs, [:task_title, :task_body, :assigned_by, :done, :done_time])
    |> validate_required([:task_title, :task_body, :assigned_by, :done, :done_time])
  end
end
