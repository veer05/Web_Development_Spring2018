defmodule GameMemoryWeb.PageController do
  use GameMemoryWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
