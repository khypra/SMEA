import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { Redirect } from "react-router-dom";

class Config extends Component {
  constructor() {
    super();
    this.state = { link: "", redirect: false };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };
  //did mount que preenche a tabela com os dados do banco assim que a página carrega
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Card style={{ maxWidth: 300 }}>
          <CardActionArea
            onClick={() =>
              this.setState({
                link: `/configuracoes/alterarsenha`,
                redirect: true
              })
            }
          >
            <CardContent>
              <CardActions
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                <i
                  className="fa fa-lock fa-3x"
                  aria-hidden="true"
                  style={{ color: "#20a8d8" }}
                ></i>
                <Typography variant="h5">Alterar Senha</Typography>
              </CardActions>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    );
  }
}

export default withSnackbar(Config);
