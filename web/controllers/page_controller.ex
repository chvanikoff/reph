defmodule Reph.PageController do
  use Reph.Web, :controller

  def index(conn, _params) do
    visitors = Reph.Visitors.state()
    initial_state = %{"visitors" => visitors}
    props = %{
      "location" => conn.request_path,
      "initial_state" => initial_state
    }

    result = Reph.ReactIO.json_call!(%{
      component: "./priv/static/server/js/reph.js",
      props: props,
    })

    render(conn, "index.html", html: result["html"], props: initial_state)
  end
end