import { Medicamento } from "./Medicamento.js";
import { Paciente } from "./Paciente.js";

// Dados hardcoded de pacientes
const pacientes = [];
if (localStorage.pacientes) {
  const pacientesJSON = JSON.parse(localStorage.pacientes);
  for (const paciente of pacientesJSON) {
    const newPaciente = new Paciente(paciente.nome, paciente.idade, paciente.id);
    newPaciente.medicamentos = paciente.medicamentos.map(m => {
      const medicamento = new Medicamento(m.nome, m.dose, new Date(m.hora));
      return medicamento;
    });
    pacientes.push(newPaciente);
  }
} else {
  pacientes.push(
    new Paciente("João Silva", 70, "1"),
    new Paciente("Maria Santos", 65, "2"),
    new Paciente("Pedro Oliveira", 80, "3"),
  )
}


// TODO O CÓDIGO AQUI
window.tomarMedicamento = function (pacienteId, medicamentoNome, medicamentoHora) {
  const paciente = pacientes.find(p => p.id == pacienteId);
  paciente.tomarMedicamento(medicamentoNome, medicamentoHora);
  savePacientes();
  renderTable();
}


function renderTable() {
  const tbody = document.querySelector('#dashboard-table tbody');
  const rows = [];
  for (const paciente of pacientes) {
    for (const medicamento of paciente.medicamentos) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${paciente.nome}</td>
        <td>${medicamento.nome}</td>
        <td>${medicamento.dose}</td>
        <td>${medicamento.hora.toLocaleString()}</td>
        <td>
          <button
            onclick="tomarMedicamento(${paciente.id}, '${medicamento.nome}', '${medicamento.hora.toISOString()}')"
          >Toma</button>
        </td>
      `;
      rows.push(row);
    }
  }
  tbody.innerHTML = '';
  for (const row of rows) {
    tbody.appendChild(row);
  }
}

function savePacientes() {
  localStorage.pacientes = JSON.stringify(pacientes);
}




document.getElementById('medicamento-form').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('Form submitted');
  const pacienteId = document.getElementById('paciente-select').value;
  const paciente = pacientes.find(p => p.id === pacienteId);

  const nome = document.getElementById('nome-medicamento').value;
  const total = parseInt(document.getElementById('total-comprimidos').value);
  const dose = parseInt(document.getElementById('dose-medicamento').value);
  const frequencia = parseInt(document.getElementById('frequencia-medicamento').value);

  paciente.adicionarMedicamento(nome, total, dose, frequencia);
  savePacientes();
  renderTable();
});



// Alimentar o selector com os nomes dos pacientes
const pacienteSelect = document.getElementById("paciente-select");
pacientes.forEach((paciente) => {
  const option = document.createElement("option");
  option.value = paciente.id;
  option.textContent = paciente.nome;
  pacienteSelect.appendChild(option);
});

renderTable();