// Função de expressão para encontrar o número menos frequente
const getLessFrequent = (nums) => {
  const frequencyMap = new Map();

  // Contar a frequência de cada número
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1);
  }

  // Encontrar o número menos frequente
  let lessFrequentNumber = null;
  let minFrequency = Infinity;

  for (const [num, frequency] of frequencyMap) {
    if (frequency < minFrequency) {
      minFrequency = frequency;
      lessFrequentNumber = num;
    }
  }

  return lessFrequentNumber;
};

// Função principal para receber números e determinar o menos frequente
function main() {
  const numbers = [];
  let input;

  // Receber números do utilizador até introduzir -1
  while (true) {
    input = prompt("Introduza um número (ou -1 para terminar):");
    const number = parseInt(input, 10);

    // Verificar se o input é um número válido
    if (isNaN(number)) {
      alert("Por favor, introduza um número válido.");
      continue;
    }

    // Terminar o loop se o utilizador introduzir -1
    if (number === -1) {
      if (numbers.length === 0) {
        alert("Deve introduzir pelo menos um número antes de terminar.");
        continue;
      } else {
        break;
      }
    }

    // Adicionar o número ao array
    numbers.push(number);
  }

  // Calcular o número menos frequente
  const lessFrequent = getLessFrequent(numbers);

  // Exibir o resultado numa caixa de alerta
  alert(`O número menos frequente é o ${lessFrequent}`);
}

// Chamar a função principal
main();
