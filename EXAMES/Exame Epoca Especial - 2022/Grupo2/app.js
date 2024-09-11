import { getGames, getGameHigherPlafond, sumPlafond, setCategory, renderTable } from "../Grupo2/GameView.js";

document.getElementById("btn1").addEventListener("click", () => {
  const category = prompt("Insira a categoria:");
  if (category) {
    getGames(category);
  }
});

document.getElementById("btn2").addEventListener("click", () => {
  getGameHigherPlafond();
});

document.getElementById("btn3").addEventListener("click", () => {
  sumPlafond();
});

document.getElementById("btn4").addEventListener("click", () => {
  const nameGame = prompt("Insira o nome do jogo:");
  const newCategory = prompt("Insira a nova categoria:");
  if (nameGame && newCategory) {
    setCategory(nameGame, newCategory);
  }
});

document.getElementById("btn5").addEventListener("click", () => {
  renderTable();
});