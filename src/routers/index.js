import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
// import loadable from "@loadable/component";

// import PrivateRoute from "./PrivateRoute";
import RestrictRoute from "./RestrictRoute";

// import MainLayout from "../components/common/layout/MainLayout";
import NotFound from "../components/error/NotFound";

import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";

const Router = () => (
  <Fragment>
    <Switch>
      <RestrictRoute exact path="/" component={LoginForm} />
      <RestrictRoute exact path="/signup" component={SignupForm} />

      {/* <PrivateRoute exact path="/dashboard" layout={MainLayout} component={Dashboard} /> */}

      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default Router;
