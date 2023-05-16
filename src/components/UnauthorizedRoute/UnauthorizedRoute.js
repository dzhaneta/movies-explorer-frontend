import React from "react";
import { Route, Redirect } from "react-router-dom";

const UnauthorizedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() =>
        props.loggedIn ? <Redirect to="./movies" /> : <Component {...props} />
      }
    </Route>
  );
};

export default UnauthorizedRoute;