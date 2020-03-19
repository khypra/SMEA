import React from "react";

const Home = React.lazy(() => import("./views/Home"));
const Acompanhamentos = React.lazy(() =>
  import("./views/Saude/Acompanhamentos")
);
const CirurgiasLimpas = React.lazy(() =>
  import("./views/Saude/CirurgiasLimpas")
);
const Pacientes = React.lazy(() => import("./views/Saude/Pacientes"));

const Charts = React.lazy(() => import("./views/Charts"));

//Documentação sobre roteamento em react.js
//https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/home", component: Home },

  { path: "/pacientes", exact: true, name: "Pacientes", component: Pacientes },
  {
    path: "/pacientes/:idP/cirurgias/:idC/acompanhamento",
    exact: true,
    name: "Acompanhamento",
    component: Acompanhamentos
  },
  {
    path: "/pacientes/:id/cirurgias",
    exact: true,
    name: "Cirurgias",
    component: CirurgiasLimpas
  },
  { path: "/graficos", name: "Charts", component: Charts }
];

export default routes;
