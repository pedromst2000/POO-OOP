document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("randomTable");
  const numRows = 3;
  const numCols = 3;
  let points = 0;
  let gameEnded = false;

  // Gerar números aleatórios para a tabela, incluindo um -1
  const numbers = generateRandomNumbers();

  // Criar a tabela e adicionar eventos de clique
  for (let i = 0; i < numRows; i++) {
    const row = table.insertRow();
    for (let j = 0; j < numCols; j++) {
      const cell = row.insertCell();
      cell.classList.add("hidden");
      cell.dataset.value = numbers[i * numCols + j];
      cell.addEventListener("click", () => revealNumber(cell));
    }
  }

  // Função para gerar números aleatórios
  function generateRandomNumbers() {
    let numbers = [];
    for (let i = 0; i < numRows * numCols - 1; i++) {
      numbers.push(Math.floor(Math.random() * 9) + 1); // Números entre 1 e 9
    }
    numbers.push(-1); // Adiciona o número -1
    shuffleArray(numbers); // Embaralha o array
    return numbers;
  }

  // Função para embaralhar um array (Fisher-Yates shuffle)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Função para revelar o número na célula clicada
  function revealNumber(cell) {
    if (gameEnded || cell.classList.contains("revealed")) return;

    const value = parseInt(cell.dataset.value);
    cell.textContent = value;
    cell.classList.add("revealed");

    if (value === -1) {
      cell.classList.add("negative");
      gameEnded = true;
      endGame();
    } else {
      cell.classList.add("positive");
      points += value;
    }
  }

  // Função para finalizar o jogo
  function endGame() {
    const cells = document.querySelectorAll("td");
    cells.forEach((cell) => {
      const value = parseInt(cell.dataset.value);
      if (!cell.classList.contains("revealed")) {
        cell.textContent = value;
      }
      if (value === -1) {
        cell.classList.add("negative");
      } else if (cell.classList.contains("positive")) {
        cell.classList.add("positive");
      }
    });

    alert(`PARABÉNS! OBTEVE ${points} PONTOS`);
  }
});
