import React from "react";
import ReactDOM from "react-dom";
import { ConnectedRouter } from "connected-react-router";
import configStore, { history } from "./configStore";
import { Provider } from "react-redux";
// Google font for material-ui
import "typeface-roboto";
import "./index.css";
import 'mapbox-gl/dist/mapbox-gl.css';

import * as serviceWorker from "./serviceWorker";
import AppRouting from "./components/AppRouting";

const store = configStore({});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRouting />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
