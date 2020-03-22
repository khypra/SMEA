import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import {
  Grid,
  Typography,
  Paper,
  Switch,
  FormControlLabel
} from "@material-ui/core";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { Redirect } from "react-router-dom";
import api from "../../services/api";
import { Card } from "@material-ui/core";

//props da tabela do material table
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

class Acompanhamentos extends Component {
  constructor() {
    super();
    this.state = {
      pacienteAtual: {}, //state que armazena o paciente atual
      cirurgiaAtual: {}, //state que armazena a cirurgia atual
      acompanhamento: {}, //state que armazena os dados do acompanhamento atual
      registros: [],
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
    //chamada da api para pegar as cirurgias que o paciente já fez
    api
      .getPaciente(this.props.match.params.idP)
      .then(result => {
        this.setState({ pacienteAtual: result.data });
      })
      .catch(err => {
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
    //chamada da api para pegar a cirurgia atual
    api
      .getCirurgiaLimpa(this.props.match.params.idC)
      .then(result => {
        this.setState({ cirurgiaAtual: result.data });
      })
      .catch(err => {
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
    //chamada para pegar os dados do acompanhamento
    api
      .getAcompanhamentoCirurgia(this.props.match.params.idC)
      .then(result => {
        console.log(result.data[0]);
        this.setState({
          acompanhamento: result.data[0]
        });
      })
      .catch(err => {
        if (err.message !== "Request failed with status code 404")
          this.props.enqueueSnackbar(err.message, { variant: "error" });
        else {
          this.setState({
            acompanhamento: {
              cirurgiaLimpaId: this.props.match.params.idC,
              responsavelPreenchimentoId: null,
              permanenciaPaciente: false,
              reinternacao: false,
              usoProtese: false,
              eventoAdverso: false,
              isc: false
            }
          });
          api
            .createAcompanhamento({ acompanhamento: this.state.acompanhamento })
            .then(result => {
              this.props.enqueueSnackbar(
                `Não existia um acompanhamento anterior, logo um vazio foi criado`,
                {
                  variant: "success"
                }
              );
            })
            .catch(err => {
              this.props.enqueueSnackbar(err.message, { variant: "error" });
            });
        }
      });
  }

  componentWillUnmount() {}

  //função que cria um registro com os dados preenchidos na tabela, usando a API.
  createRegistro({ registro }) {}

  //função que edita um registro com os dados modificados na tabela, usando a API.
  updateRegistro({ registro, update }) {}

  handleChange(event, key) {
    const temp = this.state.acompanhamento;
    temp[key[0]] = !this.state.acompanhamento[key[0]];
    this.setState({
      acompanhamento: temp
    });
    console.log("after temp", this.state.acompanhamento[key[0]]);
    api
      .updateAcompanhamento({ acompanhamento: this.state.acompanhamento })
      .then(result => {
        this.props.enqueueSnackbar(`${key[1]} foi alterado com sucesso`, {
          variant: "success"
        });
      })
      .catch(err => {
        temp[key[0]] = !this.state.acompanhamento[key[0]];
        this.setState({
          acompanhamento: temp
        });
        this.props.enqueueSnackbar(err.message, { variant: "error" });

        console.log("after temp", this.state.acompanhamento[key[0]]);
      });
  }

  acompanhamentoTela() {
    return (
      <Grid item>
        <div
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Paper
            style={{
              padding: 6,
              margin: 10,
              display: "flex",
              alignItems: "center"
            }}
          >
            <Typography
              style={{
                borderRadius: 5,
                padding: 0,
                paddingLeft: 10,
                paddingRight: 10
              }}
              variant="h6"
            >
              Paciente {<br />}
              {this.state.pacienteAtual.nome}
            </Typography>
          </Paper>
          <Paper
            style={{
              padding: 10,
              margin: 10,
              display: "flex",
              alignItems: "center"
            }}
          >
            <Typography
              style={{
                borderRadius: 5,
                padding: 0,
                paddingLeft: 10,
                paddingRight: 10
              }}
              variant="h6"
            >
              Descrição {<br />}
              {this.state.cirurgiaAtual.descricao}
            </Typography>
          </Paper>
        </div>
      </Grid>
    );
  }

  render() {
    const boolAcomp = {
      permanenciaPaciente: "Permanência do Paciênte",
      reinternacao: "Reiternação",
      usoProtese: "Uso de Protese",
      eventoAdverso: "Evento Adverso",
      isc: "ISC"
    };

    return (
      <div>
        {this.renderRedirect()}
        <Card
          style={{
            backgroundColor: "#99def0",
            padding: 8,
            margin: 10,
            marginLeft: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {this.acompanhamentoTela()}
          <div
            style={{
              display: "flex",
              flexDirection: "row"
            }}
          >
            {Object.entries(boolAcomp).map((key, item) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <Card
                  style={{
                    padding: 8,
                    margin: 10,
                    marginLeft: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    style={{
                      borderRadius: 5,
                      padding: 0,
                      paddingLeft: 10,
                      paddingRight: 10
                    }}
                    variant="h5"
                  >
                    {key[1]}
                  </Typography>
                  <FormControlLabel
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      marginLeft: 20
                    }}
                    control={
                      <Switch
                        color="primary"
                        checked={this.state.acompanhamento[key[1]]}
                        onChange={event => {
                          console.log(this.state.acompanhamento[key[0]]);
                          this.handleChange(event, key);
                        }}
                      ></Switch>
                    }
                  />
                </Card>
              </div>
            ))}
          </div>
        </Card>

        <MaterialTable
          title="Lista de Registros"
          data={this.state.registros}
          icons={tableIcons}
          columns={[
            { title: "Cirurgião", field: "nome_cirurgiao" },
            { title: "Anestesista", field: "nome_anestesista" }
          ]}
          actions={[
            {
              icon: () => <SupervisorAccountIcon color="inherit" />,
              tooltip: "Vizualizar",
              onClick: (event, rowData) => {
                console.log(rowData);
                this.setState({
                  link: `/usuarios/${rowData.id}/perfis`,
                  redirect: true
                });
              }
            }
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "Nenhum registro encontrado",
              addTooltip: "Adicionar",
              deleteTooltip: "Deletar",
              editTooltip: "Editar",
              filterRow: {
                filterTooltip: "Filtro"
              },
              editRow: {
                deleteText: "Tem certeza que deseja deletar esse registro?",
                cancelTooltip: "Cancelar",
                saveTooltip: "Salvar"
              }
            },
            grouping: {
              placeholder: "Arrastar cabeçalhos"
            },
            header: {
              actions: "Ações"
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} de {count}",
              labelRowsSelect: "registros",
              labelRowsPerPage: "Registros por página",
              firstAriaLabel: "Primeira página",
              firstTooltip: "Primeira página",
              previousAriaLabel: "Página anterior",
              previousTooltip: "Página anterior",
              nextAriaLabel: "Próxima página",
              nextTooltip: "Próxima página",
              lastAriaLabel: "Última página",
              lastTooltip: "Última página"
            },
            toolbar: {
              addRemoveColumns: "Adicionar ou remover colunas",
              nRowsSelected: "{0} coluna(s) selecionada(s)",
              showColumnsTitle: "Mostrar colunas",
              showColumnsAriaLabel: "Mostar colunas",
              exportTitle: "Exportar",
              exportAriaLabel: "Exportar",
              exportName: "Exportar como CSV",
              searchTooltip: "Buscar",
              searchPlaceholder: "Buscar"
            }
          }}
          options={{
            actionsColumnIndex: 6,
            headerStyle: {
              backgroundColor: "#99def0",
              color: "black"
            },
            pageSize: 5
          }}
          editable={{
            onRowAdd: newData => this.createRegistro({ registro: newData }),
            onRowUpdate: (newData, oldData) =>
              this.updateRegistro({ registro: oldData, update: newData })
          }}
        />
      </div>
    );
  }
}

export default withSnackbar(Acompanhamentos);
