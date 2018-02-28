defmodule TaskTracker.Repo.Migrations.AddFieldsToUsers do
  use Ecto.Migration

  def change do
  	alter table(:users) do
      add :manager_id, :integer
    end
  end
end
