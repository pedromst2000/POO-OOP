import { Album } from "../Grupo2/classes/album.js";
import { Musica } from "../Grupo2/classes/musica.js";

const albuns = [];

// Função para criar um álbum
document.getElementById("formAlbum").addEventListener("submit", (event) => {
  event.preventDefault();
  const titulo = document.getElementById("albumTitulo").value;
  const artista = document.getElementById("albumArtista").value;
  const ano = parseInt(document.getElementById("albumAno").value);
  const capa = document.getElementById("albumCapa").value;

  const album = new Album(titulo, artista, ano, capa);
  if (albuns.find((a) => a.titulo === titulo)) {
    alert("Álbum com este título já existe.");
  } else {
    albuns.push(album);
    alert("Álbum criado com sucesso!");
  }
});

// Função para adicionar uma música a um álbum
document.getElementById("formMusica").addEventListener("submit", (event) => {
  event.preventDefault();
  const albumTitulo = document.getElementById("musicaAlbum").value;
  const titulo = document.getElementById("musicaTitulo").value;
  const duracao = parseInt(document.getElementById("musicaDuracao").value);
  const rating = parseInt(document.getElementById("musicaRating").value);

  const album = albuns.find((a) => a.titulo === albumTitulo);
  if (album) {
    const musica = new Musica(titulo, duracao, rating);
    album.criarMusica(musica);
    alert("Música adicionada com sucesso!");
  } else {
    alert("Álbum não encontrado.");
  }
});

// Função para exibir os álbuns
document.getElementById("showAlbuns").addEventListener("click", () => {
  const tbody = document.querySelector("#tabelaAlbuns tbody");
  tbody.innerHTML = "";
  albuns.forEach((album) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = album.titulo;
    row.insertCell().textContent = album.artista;
    row.insertCell().textContent = album.anoLancamento;
    const img = document.createElement("img");
    img.src = album.capa;
    img.width = 100;
    row.insertCell().appendChild(img);
  });
});

// Função para exibir as músicas de um álbum
document.getElementById("showMusicas").addEventListener("click", () => {
  const albumTitulo = document.getElementById("albumParaMusicas").value;
  const album = albuns.find((a) => a.titulo === albumTitulo);
  if (album) {
    const tbody = document.querySelector("#tabelaMusicas tbody");
    tbody.innerHTML = "";
    album.musicas.forEach((musica) => {
      const row = tbody.insertRow();
      row.insertCell().textContent = musica.titulo;
      row.insertCell().textContent = musica.duracao;
      row.insertCell().textContent = musica.rating;
      row.insertCell().textContent = musica.visualizacoes;
    });
  } else {
    alert("Álbum não encontrado.");
  }
});
