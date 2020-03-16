import React from "react";

const Home = React.lazy(() => import("./views/Home"));
const Acompanhamentos = React.lazy(() =>
  import("./views/Common/Acompanhamentos")
);

const Charts = React.lazy(() => import("./views/Charts"));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/home", component: Home },

  { path: "/acompanhamentos", component: Acompanhamentos },
  { path: "/graficos", name: "Charts", component: Charts }
];

export default routes;
