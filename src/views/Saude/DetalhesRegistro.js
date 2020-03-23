import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";

import { Redirect } from "react-router-dom";
import api from "../../services/api";

class DetalhesRegistro extends Component {
  constructor() {
    super();
    this.state = {
      tiposRegistros: [], // state que diz quais são os tipos de registros para poder realizar um novo cadastro
      link: "",
      redirect: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };
  //did mount que preenche a tabela com os dados do banco assim que a página carrega
  componentDidMount() {}

  render() {
    return <div>{this.renderRedirect()}hello</div>;
  }
}

export default withSnackbar(DetalhesRegistro);
