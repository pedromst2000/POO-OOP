// Seleciona a tabela
const table = document.getElementById("letterTable");

// Alfabeto e letras usadas
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const usedLetters = [];

// Adiciona evento de clique para cada célula da tabela
for (let row of table.rows) {
  for (let cell of row.cells) {
    cell.addEventListener("click", () => handleCellClick(cell));
  }
}

// Função para lidar com o clique da célula
function handleCellClick(cell) {
  if (cell.textContent !== "") {
    alert("Erro: Esta célula já contém uma letra.");
    return;
  }

  const randomLetter = getRandomLetter();

  if (randomLetter) {
    cell.textContent = randomLetter;
  } else {
    alert("Todas as letras já foram usadas.");
  }
}

// Função para obter uma letra aleatória que ainda não foi usada
function getRandomLetter() {
  if (usedLetters.length >= alphabet.length) {
    return null; // Todas as letras foram usadas
  }

  let letter;
  do {
    letter = alphabet[Math.floor(Math.random() * alphabet.length)];
  } while (usedLetters.includes(letter));

  usedLetters.push(letter);
  return letter;
}
