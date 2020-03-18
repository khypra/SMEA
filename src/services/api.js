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

  //Profissionais-Saude Routes

  //get all Profissionais-saude
  static getProfissionaisSaude() {
    return api_interna.get(`profissionais-saude`);
  }

  //get one Profissional-saude
  static getProfissionalSaude({ id }) {
    return api_interna.get(`profissionais-saude/${id}`);
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
   */
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
  }

  /**Update Acompanhamento
   * @param {acompanhamento}
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
  }
}
