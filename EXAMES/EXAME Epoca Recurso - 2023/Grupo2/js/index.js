// script.js
import { Aluno } from "../js/classes/aluno.js";
import { Turma } from "../js/classes/turma.js";

const turma = new Turma();

document.getElementById("alunoForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Obter dados do formulário
  const nome = document.getElementById("nome").value;
  const idade = parseInt(document.getElementById("idade").value);
  const notas = document
    .getElementById("notas")
    .value.split(",")
    .map((nota) => parseFloat(nota.trim()));

  // Validar notas
  if (notas.some(isNaN)) {
    alert("Por favor, insira notas válidas.");
    return;
  }

  // Criar e adicionar o aluno
  const aluno = new Aluno(nome, idade, notas);
  turma.adicionarAluno(aluno);

  // Limpar formulário
  document.getElementById("alunoForm").reset();
});

document.getElementById("exibirAlunosBtn").addEventListener("click", () => {
  turma.exibirAlunos();
});

document.getElementById("calcularMediaBtn").addEventListener("click", () => {
  const mediaTurma = turma.calcularMediaTurma();
  alert(`A média geral da turma é: ${mediaTurma.toFixed(2)}`);
});

document
  .getElementById("exibirMelhorAlunoBtn")
  .addEventListener("click", () => {
    turma.exibirMelhorAluno();
  });
