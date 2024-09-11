// GameModel.js
export default class Game {
  constructor(nome, preco, categorias, plafond = 0) {
    this._nome = nome;
    this._preco = preco;
    this._categorias = categorias;
    this._plafond = plafond;

    // Validação das categorias
    if (this._categorias.length > 3) {
      throw new Error("Número máximo de categorias é 3.");
    }

    // Validação do plafond
    if (this._plafond > 100) {
      throw new Error("O plafond não pode ultrapassar os 100€.");
    }
  }

  // Getters e Setters
  get nome() {
    return this._nome;
  }

  set nome(value) {
    this._nome = value;
  }

  get preco() {
    return this._preco;
  }

  set preco(value) {
    this._preco = value;
  }

  get categorias() {
    return this._categorias;
  }

  set categorias(value) {
    if (value.length > 3) {
      throw new Error("Número máximo de categorias é 3.");
    }
    this._categorias = value;
  }

  get plafond() {
    return this._plafond;
  }

  set plafond(value) {
    if (value > 100) {
      throw new Error("O plafond não pode ultrapassar os 100€.");
    }
    this._plafond = value;
  }

  // Método para adicionar plafond
  addPlafond(plafond) {
    if (this._plafond + plafond > 100) {
      throw new Error("O plafond total não pode ultrapassar os 100€.");
    }
    this._plafond += plafond;
  }
}
