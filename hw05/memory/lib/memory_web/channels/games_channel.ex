defmodule MemoryWeb.GamesChannel do
  use MemoryWeb, :channel
  alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.GameBackup.load(name) || Game.new()
      socket = socket
      |> assign(:game, game)
      |> assign(:name, name)
      {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Add authorization logic here as required.
  def authorized?(_payload) do
    true
  end

  def handle_in("reset", %{"id" => res}, socket) do
   game0 = socket.assigns[:game]
   game1 = Game.reset()
   Memory.GameBackup.save(socket.assigns[:name],game1)
   socket = assign(socket, :game, game1)
   {:reply, {:ok, %{ "game" => Game.client_view(game1)}}, socket}
  end

  def handle_in("flip", %{"id" => name}, socket) do
    game0 = socket.assigns[:game]
    game1 = Game.flip(game0, name)
    Memory.GameBackup.save(socket.assigns[:name],game1)
    socket = assign(socket, :game, game1)
    broadcast! socket, "flip", %{ "game" => Game.client_view(game1)} 
    {:reply, {:ok, %{ "game" => Game.client_view(game1)}}, socket}
  end

  def handle_in("broadcast", %{"id" => name}, socket) do
  	IO.inspect("In Channel");
    game0 = socket.assigns[:game]
    broadcast socket, "broadcast", game0	
  	{:noreply, socket}
  end

  def handle_in("after_delay", %{"id" => nam}, socket) do
    game5 = socket.assigns[:game]
    game6 = Game.after_delay(game5)
    Memory.GameBackup.save(socket.assigns[:nam],game6)
    socket = assign(socket, :game, game6)
    {:reply, {:ok, %{ "game" => Game.client_view(game6)}}, socket}
  end


end
