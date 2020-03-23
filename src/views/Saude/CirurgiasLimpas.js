import { Component } from "react";
import React from "react";
import { withSnackbar } from "notistack";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

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

class CirurgiasLimpas extends Component {
  constructor() {
    super();
    this.state = {
      pacienteAtual: {}, //state que armazena o paciente atual
      cirurgiasLimpas: [], //array state que contem as cirurgias do paciente atual
      medicosCirurgioes: [], //array state que contem todos os medicos cirurgioes
      medicosAnestesistas: [], //array state que contem todos os medicos anestesistas
      link: "",
      redirect: false
    };
  }

  //função de redirecionamento da página
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={this.state.link} />;
    }
  };
  //did mount que preenche a tabela com os dados do banco assim que a página carrega
  componentDidMount() {
    //chamada para pegar os dados do paciente
    api
      .getPaciente(this.props.match.params.id)
      .then(result => {
        this.setState({ pacienteAtual: result.data });
        //chamada da api para pegar as cirurgias que o paciente já fez
        api
          .getCirurgiaLimpaPaciente(this.state.pacienteAtual.id)
          .then(result1 => {
            result1.data.forEach(cirurgia => {
              api.getCirurgiaLimpa(cirurgia.id).then(result2 => {
                this.setState({
                  cirurgiasLimpas: [...this.state.cirurgiasLimpas, result2.data]
                });
              });
            });
          })
          .catch(err => {
            if (err.message !== "Request failed with status code 404")
              this.props.enqueueSnackbar(err.message, { variant: "error" });
          });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });

    //chamada da api para pegar os nomes de todos os medicos
    api.getProfissionalSaudeTipo("medico").then(result => {
      var listMed = [];
      result.data.forEach(med => {
        listMed[med.id] = med.nome;
      });
      this.setState({
        medicosAnestesistas: listMed,
        medicosCirurgioes: listMed
      });
    });
  }

  componentWillUnmount() {}

  //função que cria uma cirurgia com os dados preenchidos na tabela, usando a API.
  createCirurgiaLimpa({ cirurgia }) {
    return api
      .createCirurgiaLimpa({
        cirurgiaLimpa: {
          pacienteId: this.state.pacienteAtual.id,
          medicoCirurgiaoId: cirurgia.medicoCirurgiao.id,
          medicoAnestesistaId: cirurgia.medicoAnestesista.id,
          ...cirurgia
        }
      })
      .then(result => {
        this.setState({
          cirurgiasLimpas: [...this.state.cirurgiasLimpas, result.data]
        });
        this.props.enqueueSnackbar(`Cirurgia Registrada com Sucesso`, {
          variant: "success"
        });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  //função que edita uma cirurgia com os dados modificados na tabela, usando a API.
  updateCirurgiaLimpa({ cirurgia, update }) {
    return api
      .updateCirurgiaLimpa({
        cirurgiaLimpa: update
      })
      .then(result => {
        const data = this.state.cirurgiasLimpas;
        data[data.indexOf(cirurgia)] = update;
        this.setState({ cirurgiasLimpas: data });
        this.props.enqueueSnackbar(`Cirurgia Atualizada com Sucesso`, {
          variant: "success"
        });
      })
      .catch(err => {
        console.error(err);
        this.props.enqueueSnackbar(err.message, { variant: "error" });
      });
  }

  // DEPRECIADO
  // //função que deleta uma cirurgia escolhida na tabela, usando a API.
  // deleteCirurgiaLimpa({ cirurgia }) {
  //   api
  //     .deleteCirurgiaLimpa(cirurgia.id)
  //     .then(result => {
  //       const data = this.state.cirurgiasLimpas;
  //       data.splice(data.indexOf(cirurgia), 1);
  //       this.setState({ systems: data });
  //       this.props.enqueueSnackbar(` ${result.data.message}`, {
  //         variant: "success"
  //       });
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       this.props.enqueueSnackbar(err.message, { variant: "error" });
  //     });
  // }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <MaterialTable
          title={`Lista de Cirurgias de ${this.state.pacienteAtual.nome}`}
          data={this.state.cirurgiasLimpas}
          icons={tableIcons}
          columns={[
            {
              title: "Cirurgião",
              field: "medicoCirurgiao.id",
              lookup: { ...this.state.medicosCirurgioes }
            },
            {
              title: "Anestesista",
              field: "medicoAnestesista.id",
              lookup: { ...this.state.medicosAnestesistas }
            },
            {
              title: "Hora início",
              field: "dataHoraInicio",
              type: "datetime"
            },
            {
              title: "Hora término",
              field: "dataHoraFim",
              type: "datetime"
            },
            {
              title: "Temp. min. sala(°C)",
              field: "temperaturaMinimaSala",
              type: "numeric"
            },
            {
              title: "Temp. máx. sala(°C)",
              field: "temperaturaMaximaSala",
              type: "numeric"
            },
            {
              title: "Descrição",
              field: "descricao"
            },
            { title: "Nova Cirurgia", field: "novaCirurgia", type: "boolean" },
            {
              title: "Cirurgia Limpa",
              field: "cirurgiaLimpa",
              type: "boolean"
            }
          ]}
          actions={[
            {
              icon: () => <SupervisorAccountIcon color="inherit" />,
              tooltip: "Acompanhamento",
              onClick: (event, rowData) => {
                console.log(rowData);
                this.setState({
                  link: `/pacientes/${this.state.pacienteAtual.id}/cirurgias/${rowData.id}/acompanhamento`,
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
            actionsColumnIndex: 9,
            headerStyle: {
              backgroundColor: "#99def0",
              color: "black"
            },
            pageSize: 5
          }}
          editable={{
            onRowAdd: newData =>
              this.createCirurgiaLimpa({ cirurgia: newData }),
            onRowUpdate: (newData, oldData) =>
              this.updateCirurgiaLimpa({ cirurgia: oldData, update: newData })
            //,onRowDelete: oldData => this.deleteCirurgiaLimpa({ user: oldData })
          }}
        />
      </div>
    );
  }
}

export default withSnackbar(CirurgiasLimpas);
