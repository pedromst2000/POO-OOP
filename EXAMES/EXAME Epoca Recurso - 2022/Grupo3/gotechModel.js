// gotechModel.js

export class Employee {
  #nome;
  #departamentos;
  #horasTrabalho;
  #valorHora;
  #empresasPrestadas;

  constructor(
    nome,
    departamentos,
    horasTrabalho,
    valorHora = 30,
    empresasPrestadas = []
  ) {
    this.#nome = nome;
    this.#departamentos = departamentos;
    this.#empresasPrestadas = empresasPrestadas;
    this.setHorasTrabalho(horasTrabalho);
    this.#valorHora = valorHora;
  }

  get nome() {
    return this.#nome;
  }

  set nome(nome) {
    this.#nome = nome;
  }

  get departamentos() {
    return this.#departamentos;
  }

  set departamentos(departamentos) {
    this.#departamentos = departamentos;
  }

  get horasTrabalho() {
    return this.#horasTrabalho;
  }

  setHorasTrabalho(horas) {
    if (horas > 140) {
      throw new Error("Nº máximo de horas de trabalho já atingido");
    }
    this.#horasTrabalho = horas;
  }

  get valorHora() {
    return this.#valorHora;
  }

  set valorHora(valor) {
    this.#valorHora = valor;
  }

  get empresasPrestadas() {
    return this.#empresasPrestadas;
  }

  addHours(nome, horas) {
    if (this.#horasTrabalho + horas > 140) {
      throw new Error("Nº máximo de horas de trabalho já atingido");
    }
    this.#horasTrabalho += horas;
  }

  editCompanies(nome, empresa) {
    if (!this.#empresasPrestadas.includes(empresa)) {
      this.#empresasPrestadas.push(empresa);
    }
  }

  totalToPay() {
    return this.#horasTrabalho * this.#valorHora;
  }
}

// Métodos de operações na turma de funcionários
export const EmployeeUtils = {
  getTotalHours(employees) {
    // Usa reduce para calcular o total de horas de trabalho
    return employees.reduce(
      (total, employee) => total + employee.horasTrabalho,
      0
    );
  },

  getTotalToPay(employees, nome) {
    // Filtra o funcionário pelo nome e calcula o total a pagar
    const employee = employees.find((emp) => emp.nome === nome);
    return employee ? employee.totalToPay() : 0;
  },

  getCompaniesWorkedFor(employees, nome) {
    // Filtra o funcionário pelo nome e retorna as empresas que ele prestou serviço
    const employee = employees.find((emp) => emp.nome === nome);
    return employee ? employee.empresasPrestadas : [];
  },

  getEmployeeWithMostHours(employees) {
    // Usa reduce para encontrar o funcionário com mais horas de trabalho
    return employees.reduce((prev, current) =>
      prev.horasTrabalho > current.horasTrabalho ? prev : current
    );
  },

  addHoursAndCompany(employees, nome, horas, empresa) {
    // Filtra o funcionário pelo nome e adiciona horas e empresa, se aplicável
    const employee = employees.find((emp) => emp.nome === nome);
    if (employee) {
      try {
        employee.addHours(nome, horas);
        employee.editCompanies(nome, empresa);
        return "Horas e empresa adicionadas com sucesso!";
      } catch (error) {
        return error.message;
      }
    } else {
      return "Funcionário não encontrado!";
    }
  },
};
