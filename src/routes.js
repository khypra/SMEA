import React from "react";

const Breadcrumbs = React.lazy(() => import("./views/Base/Breadcrumbs"));
const Home = React.lazy(() => import("./views/Home"));
const Acompanhamentos = React.lazy(() =>
  import("./views/Common/Acompanhamentos")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/home", component: Home },

  { path: "/acompanhamentos", component: Acompanhamentos },
  { path: "/base/breadcrumbs", name: "Breadcrumbs", component: Breadcrumbs }
];

export default routes;
