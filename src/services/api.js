import api_interna from "./api_interna";

export default class api {
  // Autentica o usuário e retorna o token Bearer equivalente ao login
  static autenticate(nomeUsuario, senha) {
    return api_interna.post("auth/login", { nomeUsuario, senha });
  }

  // Retorna os dados de um usuário e quais perfis ele possui nos demais sistemas
  static getMe() {
    return api_interna.get("user-info");
  }

  // Retorna todos os pacientes
  static getPacients() {
    return api_interna.get("pacientes");
  }

  /** Retorna um paciente através do número de prontuario
   * @param {cod_pront}
   */
  static getPacient(cod_pront) {
    return api_interna.get(`users/${cod_pront}`);
  }

  /** Armazena um novo paciente
   * @param {paciente}
   */
  static createPacient({ paciente }) {
    return api_interna.post("users", {});
  }

  /** Atualiza um paciênte existente
   * @param {paciente}
   */
  static updatePacient({ paciente }) {
    return api_interna.put(`users/${paciente.cod_pront}`, {});
  }
}
