defmodule TaskTracker.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :task_title, :string, null: false
      add :task_desc, :text, null: false
      add :completed, :boolean, default: false, null: false
      add :assigned_to, :string, null: false
      add :time_taken, :integer
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:tasks, [:user_id])
  end
end
