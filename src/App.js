import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import { SnackbarProvider } from "notistack";
import "./App.scss";

import { isAuthenticated } from "../src/services/auth";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

class App extends Component {
  render() {
    return (
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={props => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={props => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={props => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={props => <Page500 {...props} />}
              />
              <AuthenticatedRoute
                path="/"
                name="Home"
                component={DefaultLayout}
                // render={props => <DefaultLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </SnackbarProvider>
    );
  }
}

export default App;
