import api_interna from "./api_interna";

export default class api {
  // Autentica o usuário e retorna o token Bearer equivalente ao login
  /** Autentication route
   * @param {nomeUsuario}
   * @param {senha}
   */
  static autenticate(nomeUsuario, senha) {
    return api_interna.post("auth/login", { nomeUsuario, senha });
  }

  /** Atualiza um paciente existente
   * @param {paciente}
   */
  static updatePacient({ paciente }) {
    return api_interna.put(`users/${paciente.cod_pront}`, {});
  }
  //Rotas de Pacientes

  //Profissionais-Saude Routes

  //get all Profissionais-saude
  static getProfissionaisSaude() {
    return api_interna.get(`profissionais-saude`);
  // Retorna todos os pacientes
  static getPacientes() {
    return api_interna.get("/pacientes");
  }

  //get one Profissional-saude
  static getProfissionalSaude({ id }) {
    return api_interna.get(`profissionais-saude/${id}`);
  /** Retorna um paciente por id
   * @param {id}
   */
  static getPaciente(id) {
    return api_interna.get(`pacientes/${id}`);
  }

  //Acompanhamentos Routes

  //get all Profissionais-saude
  static getAcompanhamentos() {
    return api_interna.get(`acompanhamentos`);
  }

  //get one Profissional-saude
  static getAcompanhamento({ id }) {
    return api_interna.get(`profissionais-saude/${id}`);
  }

  /**Create Acompanhamento
   * @param {acompanhamento}
  
  //Rotas de Cirurgias Limpas

  /** Armazena uma nova cirurgia
   * @param {cirurgiaLimpa}
  static createAcompanhamento({ acompanhamento }) {
    return api_interna.post(`acompanhamentos`, {
      cirurgiaLimpaId: acompanhamento.cirurgiaLimpaId,
      responsavelPreenchimentoId: acompanhamento.responsavelPreenchimentoId,
      permanenciaPacimente: acompanhamento.permanenciaPacimente,
      reinternacao: acompanhamento.reinternacao,
      usoProtese: acompanhamento.usoProtese,
      eventoAdverso: acompanhamento.eventoAdverso,
      isc: acompanhamento.isc
    });
  static createCirurgiaLimpa({ cirurgiaLimpa }) {
    return api_interna.post("cirurgias-limpas", { cirurgiaLimpa });
  }

  /**Update Acompanhamento
   * @param {acompanhamento}
  /** Atualiza uma cirurgia limpa existente
   * @param {cirurgiaLimpa}
   */
  static updateAcompanhamento({ acompanhamento }) {
    return api_interna.put(`acompanhamentos/${acompanhamento.id}`, {
      cirurgiaLimpaId: acompanhamento.cirurgiaLimpaId,
      responsavelPreenchimentoId: acompanhamento.responsavelPreenchimentoId,
      permanenciaPacimente: acompanhamento.permanenciaPacimente,
      reinternacao: acompanhamento.reinternacao,
      usoProtese: acompanhamento.usoProtese,
      eventoAdverso: acompanhamento.eventoAdverso,
      isc: acompanhamento.isc
    });
  static updateCirurgiaLimpa({ cirurgiaLimpa }) {
    return api_interna.put(`cirurgias-limpas/${cirurgiaLimpa.id}`, {
      pacienteId: cirurgiaLimpa.pacienteId,
      medicoCirurgiaoId: cirurgiaLimpa.medicoCirurgiaoId,
      medicoAnestesistaId: cirurgiaLimpa.medicoAnestesistaId,
      dataHoraInicio: cirurgiaLimpa.dataHoraInicio,
      dataHoraFim: cirurgiaLimpa.dataHoraFim,
      descricao: cirurgiaLimpa.descricao,
      novaCirurgia: cirurgiaLimpa.novaCirurgia,
      temperaturaMinimaSala: cirurgiaLimpa.temperaturaMinimaSala,
      temperaturaMaximaSala: cirurgiaLimpa.temperaturaMaximaSala,
      cirurgiaLimpa: cirurgiaLimpa.cirurgiaLimpa
    });
  }
}
