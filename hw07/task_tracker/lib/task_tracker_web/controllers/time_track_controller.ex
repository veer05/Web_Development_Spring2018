defmodule TaskTrackerWeb.TimeTrackController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Tracker
  alias TaskTracker.Tracker.TimeTrack

  action_fallback TaskTrackerWeb.FallbackController

  def index(conn, _params) do
    timetracks = Tracker.list_timetracks()
    render(conn, "index.json", timetracks: timetracks)
  end

  def create(conn, %{"time_track" => time_track_params}) do
    with {:ok, %TimeTrack{} = time_track} <- Tracker.create_time_track(time_track_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", time_track_path(conn, :show, time_track))
      |> render("show.json", time_track: time_track)
    end
  end

  def show(conn, %{"id" => id}) do
    time_track = Tracker.get_time_track!(id)
    render(conn, "show.json", time_track: time_track)
  end

  def update(conn, %{"id" => id, "time_track" => time_track_params}) do
    time_track = Tracker.get_time_track!(id)

    with {:ok, %TimeTrack{} = time_track} <- Tracker.update_time_track(time_track, time_track_params) do
      render(conn, "show.json", time_track: time_track)
    end
  end

  def delete(conn, %{"id" => id}) do
    time_track = Tracker.get_time_track!(id)
    with {:ok, %TimeTrack{}} <- Tracker.delete_time_track(time_track) do
      send_resp(conn, :no_content, "")
    end
  end
end
