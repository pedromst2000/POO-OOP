document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("gameTable");
  const rollDiceButton = document.getElementById("rollDice");
  const movesDisplay = document.getElementById("moves");
  const diceDisplay = document.getElementById("dice");

  const numRows = 5;
  const numCols = 5;
  const numBlackholes = 2;

  let playerPosition = { row: 0, col: 0 };
  let moves = 0;

  // Criar tabela
  for (let i = 0; i < numRows; i++) {
    const row = table.insertRow();
    for (let j = 0; j < numCols; j++) {
      row.insertCell();
    }
  }

  // Posicionar buracos negros aleatoriamente
  for (let b = 0; b < numBlackholes; b++) {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * numRows);
      const col = Math.floor(Math.random() * numCols);
      const cell = table.rows[row].cells[col];
      if (!cell.classList.contains("blackhole")) {
        cell.classList.add("blackhole");
        placed = true;
      }
    }
  }

  // Posicionar a célula de vitória (amarela)
  let placedGoal = false;
  while (!placedGoal) {
    const row = Math.floor(Math.random() * numRows);
    const col = Math.floor(Math.random() * numCols);
    const cell = table.rows[row].cells[col];
    if (!cell.classList.contains("blackhole")) {
      cell.classList.add("goal");
      placedGoal = true;
    }
  }

  // Inicializar jogador na célula (0,0)
  table.rows[playerPosition.row].cells[playerPosition.col].classList.add(
    "player"
  );

  rollDiceButton.addEventListener("click", () => {
    // 1.a.i. LANÇAR O DADO: Gerar e apresentar na página um número aleatório entre 1 e 6
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    diceDisplay.textContent = diceRoll;

    // 1.a.ii. Incrementar e apresentar o número de jogadas
    moves++;
    movesDisplay.textContent = moves;

    // 1.a.iii. Atualizar a posição do jogador na tabela com base no número gerado
    movePlayer(diceRoll);
  });

  function movePlayer(steps) {
    // Remover o jogador da posição atual
    table.rows[playerPosition.row].cells[playerPosition.col].classList.remove(
      "player"
    );

    // Calcular nova posição
    let newRow = playerPosition.row;
    let newCol = playerPosition.col + steps;

    // 1.a.iii. Atualizar a linha se a coluna exceder o número de colunas
    if (newCol >= numCols) {
      newRow += Math.floor(newCol / numCols);
      newCol = newCol % numCols;
    }

    // 1.a.iii. Se ultrapassar o limite da tabela, definir a posição para a célula final
    if (newRow >= numRows) {
      newRow = numRows - 1;
      newCol = numCols - 1;
    }

    playerPosition = { row: newRow, col: newCol };

    // Atualizar a UI com a nova posição
    table.rows[playerPosition.row].cells[playerPosition.col].classList.add(
      "player"
    );

    // 2.a. Validar célula
    validateCell(playerPosition.row, playerPosition.col);
  }

  function validateCell(row, col) {
    const cell = table.rows[row].cells[col];

    // 2.a.i. Se o jogador cair numa célula com a classe blackhole
    if (cell.classList.contains("blackhole")) {
      alert("Você caiu em um buraco negro!");
      // 2.a.i.1. Exibir uma mensagem
      // 2.a.i.2. Posicionar o jogador no início da tabela, mantendo o número de jogadas
      table.rows[0].cells[0].classList.add("player");
      playerPosition = { row: 0, col: 0 };
    }
    // 2.a.ii. Se o jogador atingir a última célula (ou excedê-la)
    else if (cell.classList.contains("goal")) {
      alert("Parabéns, você venceu!");
      // 2.a.ii.1. Exibir uma mensagem
      // 2.a.ii.2. Pedir o nome
      const playerName = prompt("Digite seu nome:");
      // 2.a.ii.3. Guardar o nome e o nº de jogadas na LocalStorage
      saveScore(playerName);
    }
  }

  function saveScore(name) {
    // Recuperar pontuações do localStorage
    const scores = JSON.parse(localStorage.getItem("scores")) || [];

    // Verificar se o jogador já está na lista de pontuações
    const existingScoreIndex = scores.findIndex((score) => score.name === name);

    if (existingScoreIndex > -1) {
      // Atualizar a pontuação se for menor
      if (scores[existingScoreIndex].moves > moves) {
        scores[existingScoreIndex].moves = moves;
      }
    } else {
      // Adicionar novo jogador
      scores.push({ name, moves });
    }

    // Salvar pontuações no localStorage
    localStorage.setItem("scores", JSON.stringify(scores));
    renderLeaderboard();
  }

  function renderLeaderboard() {
    // Recuperar e ordenar as pontuações
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.sort((a, b) => a.moves - b.moves);

    // Obter os 3 melhores
    const top3 = scores.slice(0, 3);

    // Criar tabela para exibir o leaderboard
    const leaderboard = document.createElement("table");
    leaderboard.style.borderCollapse = "collapse";
    leaderboard.style.margin = "20px auto";

    top3.forEach((score, index) => {
      const row = leaderboard.insertRow();
      const rankCell = row.insertCell();
      const nameCell = row.insertCell();
      const movesCell = row.insertCell();

      rankCell.textContent = index + 1;
      nameCell.textContent = score.name;
      movesCell.textContent = score.moves;

      rankCell.style.border = "1px solid #000";
      nameCell.style.border = "1px solid #000";
      movesCell.style.border = "1px solid #000";
    });

    // Adicionar tabela do leaderboard ao corpo do documento
    document.body.appendChild(leaderboard);
  }
});
