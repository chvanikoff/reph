import React from "react";
import { Route, IndexRoute } from "react-router";

import AppContainer from "containers/App";
import Main from "components/Main";


export default (<Route path="/" component={AppContainer}>
  <IndexRoute component={Main} />
</Route>);