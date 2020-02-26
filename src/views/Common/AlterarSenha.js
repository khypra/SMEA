import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";

import { Redirect } from "react-router-dom";
import { Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import api from "../../services/api";

class AlterarSenha extends Component {
  constructor() {
    super();
    this.state = {
      userCurrent: {},
      senhaAtual: "",
      novaSenha: "",
      repeteSenha: "",
      link: "",
      redirect: false,
      erroAtual: false,
      erroNovo: false
    };
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };
  //did mount que preenche dados na página assim que a mesma carrega
  componentDidMount() {
    api
      .getMe()
      .then(result => {
        this.setState({ userCurrent: result.data.user });
      })
      .catch(err => console.error(err));
  }

  componentWillUnmount() {}

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleConfirm() {
    this.state.repeteSenha === this.state.novaSenha
      ? this.setState({
          erroNovo: false
        })
      : this.setState({
          erroNovo: true
        });

    api
      .autenticate(this.state.userCurrent.email, this.state.senhaAtual)
      .then(() => {
        if (this.state.erroNovo) {
          this.props.enqueueSnackbar("A senha Repetida está incorreta", {
            variant: "error"
          });
        } else {
          const user = {
            ...this.state.userCurrent,
            password: this.state.novaSenha
          };
          console.log(user);
          api
            .updateUserPassword({ user })
            .then(result => {
              this.props.enqueueSnackbar(` ${result.data.message}`, {
                variant: "success"
              });
            })
            .catch(err => {
              console.error(err);
              this.props.enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
        this.setState({
          erroAtual: true
        });
      });
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Paper>
          <div
            style={{
              paddingLeft: 25,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 25
            }}
          >
            <Typography gutterBottom variant="h5" component="h2">
              Alteração de Senha
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              paddingBottom: 10
            }}
          >
            <TextField
              required
              id="senhaAtual"
              label="Senha Atual"
              type="password"
              variant="outlined"
              error={this.state.erroAtual}
              onChange={event => this.handleChange(event)}
            />
            <TextField
              required
              id="novaSenha"
              label="Nova Senha"
              type="password"
              variant="outlined"
              onChange={event => this.handleChange(event)}
            />
            <TextField
              required
              id="repeteSenha"
              label="Repita a Nova Senha"
              type="password"
              variant="outlined"
              error={this.state.erroNovo}
              onChange={event => this.handleChange(event)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: 10,
              paddingBottom: 20,
              paddingRight: 25
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleConfirm()}
            >
              Confirmar Alteração
            </Button>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withSnackbar(AlterarSenha);
