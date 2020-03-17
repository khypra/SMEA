import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
// sidebar nav config
// import navigation from "../../_nav";
// routes config
import routes from "../../routes";

import { logout } from "../../services/auth";
import api from "../../services/api";

const DefaultAside = React.lazy(() => import("./DefaultAside"));
const DefaultFooter = React.lazy(() => import("./DefaultFooter"));
const DefaultHeader = React.lazy(() => import("./DefaultHeader"));

class DefaultLayout extends Component {
  state = {
    nav: {
      //items of the default menu
      items: [
        {
          name: "Home",
          url: "/home",
          icon: "icon-home"
        },
        {
          name: "Pacientes",
          url: "/pacientes",
          icon: "icon-people"
        },
        {
          name: "Gráficos",
          url: "/graficos",
          icon: "icon-chart"
        }
      ]
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    logout();
    this.props.history.push("/login");
  }

  componentDidMount() {
    // api.getMe().then(result => {
    //   console.log(result);
    //   const isAdm = result.data.user.roles.find(el => el.id === 1);
    //   typeof isAdm !== "undefined" ? this.
    // });
    const navAdmin = {
      items: [
        {
          name: "Home",
          url: "/home",
          icon: "icon-home"
        },
        {
          title: true,
          name: "Admin",
          wrapper: {
            // optional wrapper object
            element: "", // required valid HTML5 element tag
            attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
          },
          class: "" // optional class names space delimited list for title item ex: "text-center"
        },
        {
          name: "Usuários",
          url: "/usuarios",
          icon: "icon-people",
          attributes: {}
        },
        {
          name: "Sistemas",
          url: "/sistemas",
          icon: "icon-screen-desktop"
        },
        {
          name: "Órgãos",
          url: "/orgaos",
          icon: "icon-folder"
        },
        {
          name: "Parâmetros",
          url: "/parametros",
          icon: "icon-wrench"
        },
        {
          name: "Configurações",
          url: "/configuracoes",
          icon: "icon-options"
        }
      ]
    };

    api
      .getMe()
      .then(result => {
        const admin = !(
          result.data.user.roles.find(el => el.id === 1) === undefined
        );
        // console.log(admin);
        this.setState({
          nav: admin
            ? navAdmin
            : {
                items: [
                  {
                    name: "Home",
                    url: "/home",
                    icon: "icon-home"
                  },
                  {
                    name: "Configurações",
                    url: "/configuracoes",
                    icon: "icon-options"
                  }
                ]
              }
        });
        // console.log(admin);
      })
      .catch(e => console.error(e));
  }

  render() {
    // console.log(navigation);
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)} />
          </Suspense>
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav
                // navConfig={navigation}
                navConfig={this.state.nav}
                {...this.props}
                router={router}
              />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router} />
            <Container fluid>
              <Suspense fallback={this.loading()}>
                <Switch>
                  {routes.map((route, idx) => {
                    return route.component ? (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        render={props => <route.component {...props} />}
                      />
                    ) : null;
                  })}
                  <Redirect from="/" to="/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
