import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import MaterialDemo from "./MaterialDemo";

export default function AppRouting(props) {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/demo/material" component={MaterialDemo} />
        {/* <Route path="/demo" component={About} > */}
      </Switch>
    </Router>
  );
}
