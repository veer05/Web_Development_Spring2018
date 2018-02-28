defmodule TaskTrackerWeb.TimeTrackControllerTest do
  use TaskTrackerWeb.ConnCase

  alias TaskTracker.Tracker
  alias TaskTracker.Tracker.TimeTrack

  @create_attrs %{end_time: ~N[2010-04-17 14:00:00.000000], start_time: ~N[2010-04-17 14:00:00.000000]}
  @update_attrs %{end_time: ~N[2011-05-18 15:01:01.000000], start_time: ~N[2011-05-18 15:01:01.000000]}
  @invalid_attrs %{end_time: nil, start_time: nil}

  def fixture(:time_track) do
    {:ok, time_track} = Tracker.create_time_track(@create_attrs)
    time_track
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all timetracks", %{conn: conn} do
      conn = get conn, time_track_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create time_track" do
    test "renders time_track when data is valid", %{conn: conn} do
      conn = post conn, time_track_path(conn, :create), time_track: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, time_track_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "end_time" => ~N[2010-04-17 14:00:00.000000],
        "start_time" => ~N[2010-04-17 14:00:00.000000]}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, time_track_path(conn, :create), time_track: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update time_track" do
    setup [:create_time_track]

    test "renders time_track when data is valid", %{conn: conn, time_track: %TimeTrack{id: id} = time_track} do
      conn = put conn, time_track_path(conn, :update, time_track), time_track: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, time_track_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "end_time" => ~N[2011-05-18 15:01:01.000000],
        "start_time" => ~N[2011-05-18 15:01:01.000000]}
    end

    test "renders errors when data is invalid", %{conn: conn, time_track: time_track} do
      conn = put conn, time_track_path(conn, :update, time_track), time_track: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete time_track" do
    setup [:create_time_track]

    test "deletes chosen time_track", %{conn: conn, time_track: time_track} do
      conn = delete conn, time_track_path(conn, :delete, time_track)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, time_track_path(conn, :show, time_track)
      end
    end
  end

  defp create_time_track(_) do
    time_track = fixture(:time_track)
    {:ok, time_track: time_track}
  end
end
