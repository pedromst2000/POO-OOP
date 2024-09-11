// gotechView.js

import { Employee } from "./gotechModel.js";

const employees = [];

// Criando funcionários (instâncias de Employee)
const employee1 = new Employee(
  "Carlos Andrade",
  ["Informatica", "Electronica"],
  12,
  35,
  ["MKTalent", "F3M"]
);
const employee2 = new Employee(
  "Maria Pereira",
  ["Informatica", "Redes"],
  20,
  25,
  ["SKRey"]
);
const employee3 = new Employee("Carla Fonseca", ["Marketing"], 25, 30, [
  "SKRey",
  "MKTalent",
]);

employees.push(employee1, employee2, employee3);

// Renderizando tabela de funcionários
function renderTable() {
  const tableBody = document.getElementById("employeeTableBody");
  tableBody.innerHTML = "";
  employees
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .forEach((employee) => {
      const row = document.createElement("tr");

      const nomeCell = document.createElement("td");
      nomeCell.textContent = employee.nome;
      row.appendChild(nomeCell);

      const deptCell = document.createElement("td");
      deptCell.textContent = `[${employee.departamentos.join(", ")}]`;
      row.appendChild(deptCell);

      const horasCell = document.createElement("td");
      horasCell.textContent = employee.horasTrabalho;
      row.appendChild(horasCell);

      const valorHoraCell = document.createElement("td");
      valorHoraCell.textContent = employee.valorHora;
      row.appendChild(valorHoraCell);

      const totalCell = document.createElement("td");
      totalCell.textContent = employee.totalToPay();
      row.appendChild(totalCell);

      tableBody.appendChild(row);
    });

  // Atualiza o total de horas trabalhadas
  document.getElementById("totalHours").textContent =
    "Total: " + employees.reduce((acc, emp) => acc + emp.totalToPay(), 0);
}

renderTable();

// Funções para os botões F1 a F5
document.getElementById("F1").addEventListener("click", () => {
  const totalHours = employees.reduce((acc, emp) => acc + emp.horasTrabalho, 0);
  alert(`Total de horas de trabalho de todos os funcionários: ${totalHours}`);
});

document.getElementById("F2").addEventListener("click", () => {
  const nome = prompt("Digite o nome do funcionário:");
  const employee = employees.find((emp) => emp.nome === nome);
  if (employee) {
    alert(`Valor total a pagar a ${nome}: ${employee.totalToPay()}`);
  } else {
    alert("Funcionário não encontrado!");
  }
});

document.getElementById("F3").addEventListener("click", () => {
  const nome = prompt("Digite o nome do funcionário:");
  const employee = employees.find((emp) => emp.nome === nome);
  if (employee) {
    alert(
      `Empresas para as quais ${nome} prestou serviços: ${employee.empresasPrestadas.join(
        ", "
      )}`
    );
  } else {
    alert("Funcionário não encontrado!");
  }
});

document.getElementById("F4").addEventListener("click", () => {
  const melhorFuncionario = employees.reduce((prev, current) =>
    prev.horasTrabalho > current.horasTrabalho ? prev : current
  );
  alert(`Funcionário com mais horas de trabalho: ${melhorFuncionario.nome}`);
});

document.getElementById("F5").addEventListener("click", () => {
  const nome = prompt("Digite o nome do funcionário:");
  const employee = employees.find((emp) => emp.nome === nome);
  if (employee) {
    const horas = parseInt(prompt("Digite o número de horas a adicionar:"));
    const empresa = prompt("Digite o nome da empresa:");
    try {
      employee.addHours(nome, horas);
      employee.editCompanies(nome, empresa);
      renderTable();
      alert("Horas e empresa adicionadas com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  } else {
    alert("Funcionário não encontrado!");
  }
});
