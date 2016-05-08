import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducers from "reducers";
import WSActions from "actions/ws";


export default function configureStore() {
  const store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware),
  );
  store.dispatch(WSActions.socket_connect());
  store.dispatch(WSActions.channel_join("visitors"));
  return store;
}