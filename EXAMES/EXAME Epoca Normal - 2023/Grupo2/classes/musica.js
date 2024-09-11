export class Musica {
  constructor(titulo, duracao, rating) {
    this._titulo = titulo;
    this._duracao = duracao;
    this._rating = rating;
    this._visualizacoes = 0;
  }

  get titulo() {
    return this._titulo;
  }

  set titulo(value) {
    this._titulo = value;
  }

  get duracao() {
    return this._duracao;
  }

  set duracao(value) {
    if (value > 300) {
      alert("A duração não pode ser superior a 300 segundos.");
    } else {
      this._duracao = value;
    }
  }

  get rating() {
    return this._rating;
  }

  set rating(value) {
    if (value > 5) {
      alert("O rating não pode ser superior a 5.");
    } else {
      this._rating = value;
    }
  }

  get visualizacoes() {
    return this._visualizacoes;
  }

  incVisualizacoes() {
    this._visualizacoes += 1;
  }

  alteraRating(valor) {
    if (this._rating < 5) {
      this._rating += valor;
      if (this._rating > 5) this._rating = 5;
    } else {
      alert("O rating não pode ser incrementado.");
    }
  }
}
