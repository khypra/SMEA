import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";

import { Redirect } from "react-router-dom";
import api from "../../services/api";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Paper, TextField } from "@material-ui/core";

class Registros extends Component {
  constructor() {
    super();
    this.state = {
      formatos: [], // state que diz quais são os tipos de registros para poder realizar um novo cadastro
      selection: [],
      novoRegistro: {},
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
  componentDidMount() {
    api
      .getFormatos()
      .then(result => {
        console.log(result.data);
        this.setState({
          formatos: result.data
        });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  renderFields() {
    console.log(this.state.selection);
    const formato = this.state.formatos.find(
      el => el.id === parseInt(this.state.selection[0])
    );
    if (typeof formato !== "undefined") {
      const camp = formato.campos.find(
        el => el.id === parseInt(this.state.selection[2])
      );
      console.log(camp, formato);
      this.setState({
        novoRegistro: {
          formato: formato,
          acompanhamentoId: this.props.match.params.idA,
          formatoId: formato.id
        }
      });
      return (
        <div>
          <FormControl>
            {camp.tipo === "inteiro" ? (
              <TextField
                id="dado"
                label={`Dado de ${formato.nome}`}
                type="number"
              />
            ) : (
              <TextField
                id="dado"
                label={`Dado de ${formato.nome}`}
                onChange={this.setState({
                  novoRegistro: {
                    ...this.state.novoRegistro,
                    formatos: [...this.state.novoRegistro.formatos]
                  }
                })}
              />
            )}

            <TextField id="descricao" label={`Descrição`} />
          </FormControl>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <Paper
          style={{
            padding: 8,
            margin: 10,
            marginLeft: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <FormControl>
            <InputLabel htmlFor="grouped-native-select">
              Formato do Registro
            </InputLabel>
            <Select
              native
              defaultValue=""
              onChange={event =>
                this.setState({ selection: event.currentTarget.value })
              }
              input={<Input id="grouped-native-select" />}
            >
              <option aria-label="None" value="" />
              {this.state.formatos.map(opt => (
                <optgroup key={opt.id} label={opt.nome}>
                  {opt.campos.map(camp => (
                    <option key={camp.nome} value={[opt.id, camp.id]}>
                      {camp.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </FormControl>
          {this.renderFields()}
        </Paper>
      </div>
    );
  }
}

export default withSnackbar(Registros);
