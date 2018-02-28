defmodule TaskTracker.Tracker do
  @moduledoc """
  The Tracker context.
  """

  import Ecto.Query, warn: false
  alias TaskTracker.Repo

  alias TaskTracker.Tracker.Task

  @doc """
  Returns the list of tasks.

  ## Examples

      iex> list_tasks()
      [%Task{}, ...]

  """
  def list_tasks do
    Repo.all(Task)
    |> Repo.preload(:user)
  end

  @doc """
  Gets a single task.

  Raises `Ecto.NoResultsError` if the Task does not exist.

  ## Examples

      iex> get_task!(123)
      %Task{}

      iex> get_task!(456)
      ** (Ecto.NoResultsError)

  """
  def get_task!(id), do: 
    Repo.get!(Task, id)
    |> Repo.preload(:user)

  @doc """
  Creates a task.

  ## Examples

      iex> create_task(%{field: value})
      {:ok, %Task{}}

      iex> create_task(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_task(attrs \\ %{}) do
    %Task{}
    |> Task.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a task.

  ## Examples

      iex> update_task(task, %{field: new_value})
      {:ok, %Task{}}

      iex> update_task(task, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_task(%Task{} = task, attrs) do
    task
    |> Task.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Task.

  ## Examples

      iex> delete_task(task)
      {:ok, %Task{}}

      iex> delete_task(task)
      {:error, %Ecto.Changeset{}}

  """
  def delete_task(%Task{} = task) do
    Repo.delete(task)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking task changes.

  ## Examples

      iex> change_task(task)
      %Ecto.Changeset{source: %Task{}}

  """
  def change_task(%Task{} = task) do
    Task.changeset(task, %{})
  end

  alias TaskTracker.Tracker.TimeTrack

  @doc """
  Returns the list of timetracks.

  ## Examples

      iex> list_timetracks()
      [%TimeTrack{}, ...]

  """
  def list_timetracks do
    Repo.all(TimeTrack)
  end

  @doc """
  Gets a single time_track.

  Raises `Ecto.NoResultsError` if the Time track does not exist.

  ## Examples

      iex> get_time_track!(123)
      %TimeTrack{}

      iex> get_time_track!(456)
      ** (Ecto.NoResultsError)

  """
  def get_time_track!(id), do: Repo.get!(TimeTrack, id)

  @doc """
  Creates a time_track.

  ## Examples

      iex> create_time_track(%{field: value})
      {:ok, %TimeTrack{}}

      iex> create_time_track(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_time_track(attrs \\ %{}) do
    %TimeTrack{}
    |> TimeTrack.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a time_track.

  ## Examples

      iex> update_time_track(time_track, %{field: new_value})
      {:ok, %TimeTrack{}}

      iex> update_time_track(time_track, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_time_track(%TimeTrack{} = time_track, attrs) do
    time_track
    |> TimeTrack.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a TimeTrack.

  ## Examples

      iex> delete_time_track(time_track)
      {:ok, %TimeTrack{}}

      iex> delete_time_track(time_track)
      {:error, %Ecto.Changeset{}}

  """
  def delete_time_track(%TimeTrack{} = time_track) do
    Repo.delete(time_track)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking time_track changes.

  ## Examples

      iex> change_time_track(time_track)
      %Ecto.Changeset{source: %TimeTrack{}}

  """
  def change_time_track(%TimeTrack{} = time_track) do
    TimeTrack.changeset(time_track, %{})
  end
end
