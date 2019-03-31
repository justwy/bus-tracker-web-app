import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";

export default function AppRouting(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        {/* <Route path="/demo" component={About} > */}
      </Switch>
    </Router>
  );
}
