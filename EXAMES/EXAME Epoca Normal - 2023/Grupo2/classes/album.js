import { Musica } from "./musica.js";

export class Album {
  constructor(titulo, artista, anoLancamento, capa) {
    this._titulo = titulo;
    this._artista = artista;
    this._anoLancamento = anoLancamento;
    this._capa = capa;
    this._musicas = [];
  }

  get titulo() {
    return this._titulo;
  }

  get artista() {
    return this._artista;
  }

  get anoLancamento() {
    return this._anoLancamento;
  }

  get capa() {
    return this._capa;
  }

  get musicas() {
    return this._musicas;
  }

  criarMusica(musica) {
    if (musica instanceof Musica) {
      this._musicas.push(musica);
    } else {
      alert("O item não é uma instância de Musica.");
    }
  }
}
