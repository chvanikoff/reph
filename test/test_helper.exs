ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Reph.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Reph.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Reph.Repo)

