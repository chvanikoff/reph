import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "reducers";
import WSActions from "actions/ws";


const devToolsExt = typeof window === "object" && typeof window.devToolsExtension !== "undefined"
  ? window.devToolsExtension()
  : f => f;

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      devToolsExt
    )
  );
  if (typeof window !== "undefined") {
    store.dispatch(WSActions.socket_connect());
    store.dispatch(WSActions.channel_join("visitors"));
  }
  return store;
}