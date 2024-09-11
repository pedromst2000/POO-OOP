/**
 * @class Publicacao
 * @description Classe que representa uma publicação.
 * @param {string} titulo - O título da publicação.
 * @param {string} genero - O gênero da publicação.
 * @param {Conta} autor - O autor da publicação.
 * @property {number} gostos - A quantidade de gostos da publicação.
 */

// publicacao.js
export default class Publicacao {
  constructor(titulo, genero, autor) {
    this.titulo = titulo;
    this.genero = genero;
    this.autor = autor; // Autor deve ser uma instância de Conta
    this.gostos = 0;
  }
}
