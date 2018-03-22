defmodule MyApp.Repo.Migrations.CreateWorks do
  use Ecto.Migration

  def change do
    create table(:works) do
      add :task_title, :text
      add :task_body, :text
      add :assigned_by, :text
      add :done, :boolean, default: false, null: false
      add :done_time, :time
      add :user_id, references(:users, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:works, [:user_id])
  end
end
