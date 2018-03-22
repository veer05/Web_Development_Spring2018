# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# Configures the endpoint
config :game_memory, GameMemoryWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "eR0KjBkXDzDUCf8pxXh3QWCrqpzH3PY9XMxm1loT5Xg0IhT0/YkA0IfwGvTTL0oL",
  render_errors: [view: GameMemoryWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: GameMemory.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
