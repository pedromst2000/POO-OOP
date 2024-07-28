import { Medicamento } from "./Medicamento.js";

export class Paciente {
    id = 0;
    nome = '';
    idade = 0;
    medicamentos = [];

    constructor(nome, idade, id) {
        this.nome = nome;
        this.idade = idade;
        this.id = id;
    }

    adicionarMedicamento(nome, total, dose, frequencia) {

        const tomas = total / dose;
        const intervalo = 24 / frequencia;

        for (let i = 0; i < tomas; i++) {
            const hora = new Date();
            hora.setHours(hora.getHours() + intervalo * i);
            this.medicamentos.push(new Medicamento(nome, dose, hora));
        }
    }

    tomarMedicamento(nome, hora) {
        const medicamento = this.medicamentos.find(m => m.nome === nome && m.hora.toISOString() === hora);
        if (medicamento) {
            this.medicamentos = this.medicamentos.filter(m => m !== medicamento);
        }
    }
}
