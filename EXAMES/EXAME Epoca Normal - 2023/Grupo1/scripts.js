document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("gameTable");
  const cells = table.getElementsByTagName("td");
  let totalAttempts = 0;

  // Adiciona um evento de clique para cada célula
  Array.from(cells).forEach((cell) => {
    cell.addEventListener("click", () => {
      totalAttempts++;
      // Gera um número aleatório entre 1 e 9
      const randomNumber = Math.floor(Math.random() * 9) + 1;
      cell.textContent = randomNumber;

      // Verifica as somas das linhas após cada clique
      checkRowSums();
    });
  });

  // Função para verificar a soma das linhas
  function checkRowSums() {
    const rows = table.getElementsByTagName("tr");
    let allRowsGreen = true;

    Array.from(rows).forEach((row) => {
      const rowCells = row.getElementsByTagName("td");
      let rowSum = 0;

      Array.from(rowCells).forEach((cell) => {
        rowSum += Number(cell.textContent) || 0;
      });

      if (rowSum === 10) {
        row.classList.add("green-row"); // Altera a cor da linha para verde
      } else {
        row.classList.remove("green-row");
        allRowsGreen = false; // Se alguma linha não estiver verde, a tabela não está completamente verde
      }
    });

    // Se todas as linhas estiverem verdes, o jogador ganha
    if (allRowsGreen) {
      alert(`PARABÉNS! VOCÊ GANHOU COM ${totalAttempts} TENTATIVAS`);
    }
  }
});
