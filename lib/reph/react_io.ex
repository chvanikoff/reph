defmodule Reph.ReactIO do
  use StdJsonIo, otp_app: :reph, script: "node_modules/react-stdio/bin/react-stdio"
end