/**
 * @class Seguidor
 * @description Classe que representa um seguidor de um perfil
 * @param {string} nome - Nome do seguidor
 * @param {number} idade - Idade do seguidor
 * @param {number} id - ID do seguidor
 * @param {Date} dataSeguidor - Data em que o seguidor foi adicionado
 */

export default class Seguidor {
  constructor(nome, idade, id) {
    this.nome = nome;
    this.idade = idade;
    this.id = id;
    this.dataSeguidor = new Date(); // Assume que o seguidor foi adicionado agora
  }
}
