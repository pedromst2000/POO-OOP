export class Medicamento {
    nome = '';
    dose = 0;
    hora = new Date();

    constructor(nome, dose, hora) {
        this.nome = nome;
        this.dose = dose;
        this.hora = hora;
    }
}
