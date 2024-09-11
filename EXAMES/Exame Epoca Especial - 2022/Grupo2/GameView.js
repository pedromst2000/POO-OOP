// GameView.js
import Game  from "../Grupo2/GameModel.js";

// Criando instâncias dos jogos
const games = [
  new Game("FIFA 2021", 65, ["Sports", "Simulation"], 0),
  new Game("Grand Montain Adventure", 55, ["Sports", "Simulation"], 0),
  new Game("Drift Hunters", 45, ["Cars"], 0),
  new Game("Project Cars 2", 60, ["Cars", "Simulation", "Driving"], 30),
];

// Função para obter jogos por categoria
export function getGames(category) {
  const filteredGames = games.filter((game) =>
    game.categorias.includes(category)
  );
  if (filteredGames.length > 0) {
    alert(filteredGames.map((game) => game.nome).join(", "));
  } else {
    alert("Nenhum jogo encontrado para a categoria especificada.");
  }
}

// Função para obter o jogo com o maior plafond
export function getGameHigherPlafond() {
  const gameWithHigherPlafond = games.reduce(
    (max, game) => (game.plafond > max.plafond ? game : max),
    games[0]
  );
  alert(`O jogo com o maior plafond é: ${gameWithHigherPlafond.nome}`);
}

// Função para somar o plafond de todos os jogos
export function sumPlafond() {
  const totalPlafond = games.reduce((sum, game) => sum + game.plafond, 0);
  alert(`O valor total de plafond de todos os jogos é: ${totalPlafond}€`);
}

// Função para adicionar uma nova categoria a um jogo
export function setCategory(nameGame, newCategory) {
  const game = games.find((game) => game.nome === nameGame);
  if (game) {
    if (game.categorias.length < 3) {
      game.categorias.push(newCategory);
      alert(`Categoria "${newCategory}" adicionada ao jogo "${nameGame}".`);
    } else {
      alert("Número máximo de categorias para um jogo é 3.");
    }
  } else {
    alert("Jogo não encontrado.");
  }
}

// Função para renderizar a tabela de jogos
export function renderTable() {
  // Ordena os jogos por nome
  const sortedGames = [...games].sort((a, b) => a.nome.localeCompare(b.nome));

  const container = document.getElementById("gamesTableContainer");
  container.innerHTML = "";

  // Cria a tabela
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  // Cria o cabeçalho da tabela
  const headerRow = document.createElement("tr");
  const headers = ["Nome", "Preço", "Categorias", "Plafond"];
  headers.forEach((header) => {
    const th = document.createElement("th");
    th.textContent = header;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Cria as linhas da tabela
  sortedGames.forEach((game) => {
    const row = document.createElement("tr");
    const cells = [
      game.nome,
      `${game.preco}€`,
      game.categorias.join(", "),
      `${game.plafond}€`,
    ];
    cells.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      row.appendChild(td);
    });
    tbody.appendChild(row);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  // Adiciona a tabela ao container
  container.appendChild(table);

  // Atualiza as labels com o total de jogos e total de plafond
  updateInfoLabels();
}

// Função para atualizar as labels de informações
function updateInfoLabels() {
  const totalGames = games.length;
  const totalPlafond = games.reduce((sum, game) => sum + game.plafond, 0);

  document.getElementById(
    "totalGames"
  ).textContent = `Total Jogos: ${totalGames}`;
  document.getElementById(
    "totalPlafond"
  ).textContent = `Total Plafond: ${totalPlafond}€`;
}
