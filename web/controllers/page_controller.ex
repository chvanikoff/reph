defmodule Reph.PageController do
  use Reph.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
