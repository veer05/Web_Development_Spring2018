defmodule TaskTrackerWeb.SessionController do
  use TaskTrackerWeb, :controller

  alias TaskTracker.Accounts
  alias TaskTracker.Accounts.User

  def create(conn, %{"email" => email}) do
    user = Accounts.get_user_by_email(email)
    if user do
      conn
      |> put_session(:user_id, user.id)
      |> put_flash(:info, "Yay!! Happy to see you!! Welcome back #{user.name}")
      |> redirect(to: "/feed")
    else
      conn
      |> put_flash(:error, "Can't create session")
      |> redirect(to: page_path(conn, :index))
    end
  end
  # Storing User ID in the session bacause it is more optimal, Storing User object may
  # be too much info, and if user is banned then when the user obejct is loaded it shoWs 
  # banned
  
  # Redirect to login page on logout, Choice of either redirect to manually created 
  # Successfully created logout page or Login page again, Decided to redirect to login page
  # so that other user can login on some present user logout 
  def delete(conn, _params) do
    conn
    |> delete_session(:user_id)
    |> put_flash(:info, "You are been Logged out")
    |> redirect(to: page_path(conn, :index))
  end
end