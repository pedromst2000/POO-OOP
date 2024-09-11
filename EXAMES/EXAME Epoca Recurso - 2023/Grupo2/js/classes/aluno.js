// aluno.js
export class Aluno {
  constructor(nome, idade, notas) {
    this.nome = nome;
    this.idade = idade;
    this.notas = notas;
  }

  // Método para calcular a média das notas do aluno
  calcularMedia() {
    const total = this.notas.reduce((acc, nota) => acc + nota, 0);
    return total / this.notas.length;
  }
}
