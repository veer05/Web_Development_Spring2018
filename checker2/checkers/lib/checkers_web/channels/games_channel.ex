defmodule CheckersWeb.GamesChannel do
  use CheckersWeb, :channel

  alias Checkers.Game

  #def join("games:lobby", payload, socket) do
  #  if authorized?(payload) do
  #    {:ok, socket}
  #  else
  #    {:error, %{reason: "unauthorized"}}
  #  end
  #end

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do

      game = Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  

  def handle_in("movepawn", %{"id" => id, "pawn_id" => pawn_id, "color" => color}, socket) do
    IO.inspect("inside channel movePawn")
    IO.inspect(id)
    game0 = socket.assigns[:game]
    game1 = Game.movepawn(game0,id,pawn_id,color)
    socket = assign(socket, :game, game1)
    {:reply, {:ok, %{ "game" => Game.client_view(game1)}}, socket}
    
  end

  def handle_in("getNextPos", %{"id" => id, "color" => color}, socket) do
    IO.inspect("inside channel getNextPos")
    game0 = socket.assigns[:game]
    game1 = Game.getNextPos(game0,id,color)
    socket = assign(socket, :game, game1)
    {:reply, {:ok, %{ "game" => Game.client_view(game1)}}, socket}
    
  end


  
  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (games:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
