defmodule TaskTrackerWeb.TimeTrackView do
  use TaskTrackerWeb, :view
  alias TaskTrackerWeb.TimeTrackView

  def render("index.json", %{timetracks: timetracks}) do
    %{data: render_many(timetracks, TimeTrackView, "time_track.json")}
  end

  def render("show.json", %{time_track: time_track}) do
    %{data: render_one(time_track, TimeTrackView, "time_track.json")}
  end

  def render("time_track.json", %{time_track: time_track}) do
    %{id: time_track.id,
      start_time: time_track.start_time,
      end_time: time_track.end_time}
  end
end
