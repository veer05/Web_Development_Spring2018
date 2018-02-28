defmodule TaskTracker.Repo.Migrations.CreateTimetracks do
  use Ecto.Migration

  def change do
    create table(:timetracks) do
      add :start_time, :naive_datetime
      add :end_time, :naive_datetime
      add :task_id, references(:tasks, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:timetracks, [:task_id])
  end
end
