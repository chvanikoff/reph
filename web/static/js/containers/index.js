import React from "react";
import { Provider } from "react-redux";
import { Router, RouterContext, browserHistory, createMemoryHistory, match } from "react-router";

import configureStore from "../store";
import routes from "../routes";


export default class Index extends React.Component {
  render() {
    let initialState, history, router;
    if (typeof window === "undefined") {
      initialState = this.props.initial_state;
      history = createMemoryHistory();
      match({ routes, location: this.props.location, history }, (err, redirect, props) => {
        if (props) {
          router = <RouterContext { ...props } />;
        }
        // Since it's a very basic app, we don't handle any errors, however in real app you will have do this.
        // Please, refer to https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
        // to find more relevant information.
      });
    } else {
      initialState = window.__INITIAL_STATE__;
      history = browserHistory;
      router = <Router history={history}>
        {routes}
      </Router>;
    }
    const store = configureStore(initialState);
    
    return (
      <Provider store={store}>
        {router}
      </Provider>
    );
  }
}