document.addEventListener("DOMContentLoaded", function () {
  const symbolicRadio = document.querySelector('input[value="symbolic"]');
  const numericRadio = document.querySelector('input[value="numeric"]');
  const operandsDiv = document.querySelector(".operands");
  const operandInputFields = document.querySelectorAll(".oper_typ");
  const turingMachine = document.querySelector(".turing-machine");
  const alphabetInput = document.getElementById("alphabet-input");
  const errorField = document.createElement("p");
  const moveLeftButton = document.querySelector(".move-left");
  const moveRightButton = document.querySelector(".move-right");

  function clearInputFields() {
    operandInputFields.forEach((input) => {
      input.value = "";
    });
  }

  document
    .querySelector(".radio-label")
    .addEventListener("click", function (event) {
      const clickedElement = event.target;
      if (clickedElement.tagName === "LABEL") {
        clearInputFields();
      }
    });

  symbolicRadio.addEventListener("change", function () {
    if (symbolicRadio.checked) {
      clearInputFields();
    }
  });

  numericRadio.addEventListener("change", function () {
    if (numericRadio.checked) {
      clearInputFields();
    }
  });

  operandInputFields.forEach(function (input) {
    input.addEventListener("input", function (event) {
      const inputValue = event.target.value;
      const sanitizedValue = inputValue.replace(/\D/g, ""); // Оставляем только цифры

      event.target.value = sanitizedValue; // Устанавливаем обновленное значение в поле
    });
  });

  // Добавление поля для ошибок
  errorField.classList.add("error-field");
  operandsDiv.appendChild(errorField);

  // Установка прозрачности и блокировка инпутов при загрузке страницы
  operandsDiv.style.opacity = "0.5";
  operandInputFields.forEach((input) => {
    input.disabled = true;
  });
  // Делаем один из инпутов доступным всегда
  alphabetInput.disabled = false;

  symbolicRadio.addEventListener("change", function () {
    if (symbolicRadio.checked) {
      operandsDiv.style.opacity = "0.5";
      operandInputFields.forEach((input) => {
        input.disabled = true;
      });
      // Делаем один из инпутов доступным всегда
      alphabetInput.disabled = false;
      errorField.textContent = "";
      const tapeSymbols = document.getElementById("tape-symbols");
      tapeSymbols.innerHTML = ""; // Удаление содержимого элемента
      createTapeSymbols();
      moveLeftButton.classList.toggle("hidden");
      moveRightButton.classList.toggle("hidden");
    }
  });

  numericRadio.addEventListener("change", function () {
    if (numericRadio.checked) {
      operandsDiv.style.opacity = "1";
      operandInputFields.forEach((input) => {
        input.disabled = false;
      });
      const tapeSymbols = document.getElementById("tape-symbols");
      tapeSymbols.innerHTML = ""; // Удаление содержимого элемента
      createTapeSymbols();
      moveLeftButton.classList.toggle("hidden");
      moveRightButton.classList.toggle("hidden");
    }
  });

  // Проверка введенных чисел
  operandInputFields.forEach((input) => {
    input.addEventListener("input", function () {
      const operand1 = parseInt(operandInputFields[0].value);
      const operand2 = parseInt(operandInputFields[1].value);

      let errorMessage = "";

      switch (true) {
        case operand1 === 0 ||
          operand2 === 0 ||
          operand1 > 200 ||
          operand2 > 200:
          errorMessage = "Операнд должен находиться в диапозоне от 1 до 200";
          const tapeSymbolserr1 = document.getElementById("tape-symbols");
          tapeSymbolserr1.innerHTML = ""; // Удаление содержимого элемента
          createTapeSymbols();
          break;
        case operand1 + operand2 > 400:
          errorMessage = "Сумма чисел не должна превышать 400.";
          const tapeSymbolserr2 = document.getElementById("tape-symbols");
          tapeSymbolserr2.innerHTML = ""; // Удаление содержимого элемента
          createTapeSymbols();
          break;
        case operand1 === "" ||
          operand2 === "" ||
          isNaN(operand1) ||
          isNaN(operand2):
          errorMessage = "Пожалуйста, введите значение для двух операндов";
          const tapeSymbolserr3 = document.getElementById("tape-symbols");
          tapeSymbolserr3.innerHTML = ""; // Удаление содержимого элемента
          createTapeSymbols();
          break;
        default:
          errorMessage = "";
          break;
      }

      errorField.textContent = errorMessage;
      errorField.style.color = "red";

      if (
        !isNaN(operand1) &&
        !isNaN(operand2) &&
        errorField.textContent == ""
      ) {
        redrawTape(operand1, operand2);
        const operands = { operand1, operand2 };
        localStorage.setItem("NumericLine", JSON.stringify(operands));
      }
    });
  });

  function redrawTape(operand1, operand2) {
    const tapeSymbolsContainer = document.getElementById("tape-symbols");
    tapeSymbolsContainer.innerHTML = "";

    const separatorSymbol = "x";
    const leftSymbols = "*".repeat(operand1);
    const rightSymbols = "*".repeat(operand2);

    const tapeLength = 27;
    const middleIndex = Math.floor(tapeLength / 2);

    const tape = [];

    for (let i = 0; i < tapeLength; i++) {
      const tapeSymbol = document.createElement("button");
      tapeSymbol.classList.add("tape-symbol");

      if (i < middleIndex - leftSymbols.length) {
        tapeSymbol.textContent = "_";
        tape.push("_");
      } else if (i < middleIndex) {
        tapeSymbol.textContent =
          leftSymbols[i - (middleIndex - leftSymbols.length)];
        tape.push(leftSymbols[i - (middleIndex - leftSymbols.length)]);
      } else if (i === middleIndex) {
        tapeSymbol.textContent = separatorSymbol;
        tape.push(separatorSymbol);
      } else if (i <= middleIndex + rightSymbols.length) {
        tapeSymbol.textContent = rightSymbols[i - middleIndex - 1];
        tape.push(rightSymbols[i - middleIndex - 1]);
      } else {
        tapeSymbol.textContent = "_";
        tape.push("_");
      }
      if (i === 13) {
        tapeSymbol.style.backgroundColor = "#d9e94c";
      }
      tapeSymbolsContainer.appendChild(tapeSymbol);
    }

    localStorage.setItem("NumericLine", JSON.stringify(tape));
  }
});
