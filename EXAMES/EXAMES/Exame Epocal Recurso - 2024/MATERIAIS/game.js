document.addEventListener('DOMContentLoaded', () => {
    const table = document.getElementById('gameTable');
    const rollDiceButton = document.getElementById('rollDice');
    const movesDisplay = document.getElementById('moves');
    const diceDisplay = document.getElementById('dice');

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
            if (!cell.classList.contains('blackhole')) {
                cell.classList.add('blackhole');
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
        if (!cell.classList.contains('blackhole')) {
            cell.classList.add('goal');
            placedGoal = true;
        }
    }

    rollDiceButton.addEventListener("click", () => {
      // LANÇAR O DADO

      // ATUALIZAR A UI

      // CHAMAR A FUNÇÃO movePlayer QUE VAI MOVER O JOGADOR

    });

    function movePlayer(steps) {
        // ESCREVER CÓDIGO

    }

     function validateCell(row, col) {
       // ESCREVER CÓDIGO
     }

      function renderLeaderboard() {
        // ESCREVER CÓDIGO
      }
   
        
});
