import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import SelectRole from "./component/SelectRole";
import Home from "./component/Home";
import SignIn from "./component/SignIn";
import { paths } from "./config";

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={paths.role} component={SelectRole} />
        <Route path={paths.home.default} component={Home} />
        <Route path={paths.login} component={SignIn} />
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;
