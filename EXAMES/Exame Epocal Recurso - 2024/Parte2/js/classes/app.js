// app.js
import Conta from "../classes/Conta.js";
import Seguidor from "../classes/Seguidor.js";
import Publicacao from "../classes/Publicacao.js";

// Create an instance of Conta
const contaPrincipal = new Conta("User Account", 25);

// DOM Elements
const followerNameInput = document.getElementById("followerName");
const followerAgeInput = document.getElementById("followerAge");
const addFollowerBtn = document.getElementById("addFollowerBtn");

const publicationTitleInput = document.getElementById("publicationTitle");
const publicationGenreInput = document.getElementById("publicationGenre");
const publicationAuthorInput = document.getElementById("publicationAuthor");
const addPublicationBtn = document.getElementById("addPublicationBtn");

const likePublicationTitleInput = document.getElementById(
  "likePublicationTitle"
);
const likePublicationBtn = document.getElementById("likePublicationBtn");

const showResultsBtn = document.getElementById("showResultsBtn");
const resultsDiv = document.getElementById("results");

// Add Event Listeners
addFollowerBtn.addEventListener("click", () => {
  const name = followerNameInput.value.trim();
  const age = parseInt(followerAgeInput.value, 10);
  if (name && !isNaN(age)) {
    const newFollower = new Seguidor(
      Date.now().toString(),
      name,
      age,
      new Date()
    );
    contaPrincipal.adicionarSeguidor(newFollower);
    alert(`Follower ${name} added!`);
    followerNameInput.value = "";
    followerAgeInput.value = "";
  } else {
    alert("Please enter a valid name and age.");
  }
});

addPublicationBtn.addEventListener("click", () => {
  const title = publicationTitleInput.value.trim();
  const genre = publicationGenreInput.value.trim();
  const authorName = publicationAuthorInput.value.trim();

  const author = contaPrincipal.seguidores.find((s) => s.nome === authorName);
  if (!author) {
    alert("Author not found! Please add the author as a follower first.");
    return;
  }

  if (title && genre) {
    const newPublication = new Publicacao(title, genre, author);
    contaPrincipal.adicionarPublicacao(newPublication);
    alert(`Publication ${title} added!`);
    publicationTitleInput.value = "";
    publicationGenreInput.value = "";
    publicationAuthorInput.value = "";
  } else {
    alert("Please fill out all fields.");
  }
});

likePublicationBtn.addEventListener("click", () => {
  const title = likePublicationTitleInput.value.trim();
  if (title) {
    contaPrincipal.gostarPublicacao(title);
    alert(`Liked publication: ${title}`);
    likePublicationTitleInput.value = "";
  } else {
    alert("Please enter a valid publication title.");
  }
});

showResultsBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = `
        <h3>Average Age of Followers: ${contaPrincipal.obterMediaIdades()}</h3>
        <h3>Most Liked Publication: ${
          contaPrincipal.obterPublicacaoMaisGostada().titulo
        }</h3>
        <h3>Most Liked Genre: ${contaPrincipal.obterGeneroMaisGostado()}</h3>
    `;
});
