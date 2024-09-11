// turma.js
import { Aluno } from "./aluno.js";

export class Turma {
  constructor() {
    this.alunos = [];
  }

  // Método para adicionar um aluno à turma
  adicionarAluno(aluno) {
    this.alunos.push(aluno);
    alert(`Aluno ${aluno.nome} adicionado com sucesso!`);
  }

  // Método para calcular a média geral da turma
  calcularMediaTurma() {
    if (this.alunos.length === 0) return 0;
    const totalMedia = this.alunos.reduce(
      (acc, aluno) => acc + aluno.calcularMedia(),
      0
    );
    return totalMedia / this.alunos.length;
  }

  // Método para exibir a lista de alunos
  exibirAlunos() {
    if (this.alunos.length === 0) {
      alert("Não há alunos registrados na turma.");
      return;
    }
    const listaAlunos = this.alunos.map((aluno) => aluno.nome).join(", ");
    alert(`Alunos na turma: ${listaAlunos}`);
  }

  // Método para exibir o aluno com a melhor média
  exibirMelhorAluno() {
    if (this.alunos.length === 0) {
      alert("Não há alunos registrados na turma.");
      return;
    }
    let melhorAluno = this.alunos[0];
    this.alunos.forEach((aluno) => {
      if (aluno.calcularMedia() > melhorAluno.calcularMedia()) {
        melhorAluno = aluno;
      }
    });
    alert(
      `O melhor aluno é ${melhorAluno.nome} com média ${melhorAluno
        .calcularMedia()
        .toFixed(2)}`
    );
  }
}
