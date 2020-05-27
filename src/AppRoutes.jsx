import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import SelectRole from "./component/SelectRole";
import Home from "./component/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/selectrole" component={SelectRole} />
        <Route path="/home" component={Home} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
