document.addEventListener("DOMContentLoaded", () => {
  const categoriaInput = document.getElementById("categoriaInput");
  const addButton = document.getElementById("addButton");
  const removeButton = document.getElementById("removeButton");
  const categoriaSelect = document.getElementById("categoriaSelect");

  // Função para atualizar o estado do botão ADD
  const updateAddButtonState = () => {
    addButton.disabled = !categoriaInput.value.trim();
  };

  // Função para adicionar uma nova categoria
  const addCategoria = () => {
    const categoria = categoriaInput.value.trim();
    const options = Array.from(categoriaSelect.options).map(
      (option) => option.value
    );

    if (categoria && !options.includes(categoria)) {
      const newOption = document.createElement("option");
      newOption.value = categoria;
      newOption.textContent = categoria;
      categoriaSelect.appendChild(newOption);
      categoriaInput.value = "";
      updateAddButtonState();
    } else if (options.includes(categoria)) {
      alert("Categoria já existe.");
    }
  };

  // Função para remover a categoria selecionada
  const removeCategoria = () => {
    const selectedOption = categoriaSelect.selectedOptions[0];

    if (selectedOption && selectedOption.value !== "") {
      categoriaSelect.removeChild(selectedOption);
    } else {
      alert("Selecione uma categoria para remover.");
    }
  };

  // Adiciona event listeners
  categoriaInput.addEventListener("input", updateAddButtonState);
  addButton.addEventListener("click", addCategoria);
  removeButton.addEventListener("click", removeCategoria);
});
