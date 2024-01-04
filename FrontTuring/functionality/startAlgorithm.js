const startButton = document.querySelector(".start-button");

startButton.addEventListener("click", function () {
  alphabetAddColumnToLocalStorage();
  const dropdowns = document.querySelectorAll(".dropdownLoadAlg select");
  const isLoadAlg = isSelectChoose(dropdowns);
  if (isTapeNotEmpty()) {
    if (isLoadAlg) {
      if (areListsSelected()) {
        //setElementsDisabled();
        generalLaunch(isLoadAlg);
        console.log("Алгоритм загруженный пошел работать");
      }
    } else {
      const tableRows = document.querySelectorAll(
        ".statetable tbody tr:not(:first-child)"
      );
      const rowsArray = Array.from(tableRows);
      rowsArray.shift();
      const objectValues = JSON.parse(localStorage.getItem("objectsArray"));
      if (
        // isAlphabetTextValueEmpty() &&
        // checkOneHalt() &&
        // checkEveryRowCorrect(rowsArray, objectValues) &&
        // checkAndHandleEmptyArrays(objectValues) &&
        // checkTableNotEmpty(objectValues) &&
        areListsSelected()
      ) {
        //setElementsDisabled();
        generalLaunch(isLoadAlg);
        handleInputErrorNotLoadAlg();
      }
    }
  }
});
function generalLaunch(isLoadAlg) {
  const alphabet = getFinalAlphabet();
  const executionMode = document.getElementById("execution-mode");
  const executionSpeed = document.getElementById("execution-speed");
  const selectedMode = executionMode.value;
  const selectedSpeed = executionSpeed.value;
  if (isLoadAlg) {
    const basicAlgorithmSelect = document.getElementById(
      "basicAlgorithmSelect"
    );
    const customAlgorithmSelect = document.getElementById(
      "customAlgorithmSelect"
    );

    const selectedOptionValue =
      basicAlgorithmSelect.value !== ""
        ? basicAlgorithmSelect.value
        : customAlgorithmSelect.value;

    if (selectedOptionValue !== "") {
      const id = selectedOptionValue; // ID алгоритма

      const url = `http://localhost:8100/algorythm/${id}/execute?tape=${encodeURIComponent(
        alphabet
      )}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem("ExportTrcData", JSON.stringify(data));
          switch (selectedMode) {
            case "step-by-step":
              viewStepByStep(data);
              break;
            case "auto-delay":
              viewAutoDelay(data, selectedSpeed);
              break;
            case "auto":
              viewAuto(data);
              break;
            default:
              console.log("Выберите режим выполнения");
              break;
          }
        })
        .catch((error) => {
          const errorText = document.querySelector(".error-form__text");
          errorText.textContent = "Ошибка при получении данных";
          showErrorForm();
        });
    } else {
      //setElementsEnabled();
      handleInputErrorNotLoadAlg();
    }
  }
}
function viewStepByStep(data) {
  let index = 0;
  let delayTime = 0;
  let interval;
  updateAndStoreTraces(data); // Отправляем все трассы в локальное хранилище
  // Устанавливаем обработчик на кнопку "Следующий шаг"
  const nextStepButton = document.querySelector(".start-button-next");
  nextStepButton.classList.toggle("hidden");
  // Вызываем первый шаг сразу после инициализации
  performSingleStep(data, index);
  index++;
  nextStepButton.addEventListener("click", () => {
    if (index < data.length) {
      performSingleStep(data, index);
      index++;
    } else {
      clearInterval(interval); // Если шаги закончились, очищаем интервал
    }
  });

  // Функция для выполнения одного шага алгоритма
  function performSingleStep(data, index) {
    const currentTrace = data[index];
    let currentState = currentTrace.currentState;
    const caretPosition = currentTrace.currentCaretPosition;
    let tape = currentTrace.tape;

    let symbolBefore = tape.charAt(caretPosition);

    if (currentState === "HALT" && index > 0) {
      currentState = data[index - 1].currentState;
      const previousCaretPosition = data[index - 1].currentCaretPosition;
      const previousTape = data[index - 1].tape;
      symbolBefore = previousTape.charAt(previousCaretPosition);
    }

    localStorage.setItem("currentStatusTrace", index + 1);
    const traces = JSON.parse(localStorage.getItem("traces")) || [];
    let resultString = traces[index];
    resultString = "_".concat(resultString);
    console.log(resultString);
    highlightNewLine2(resultString, true);
    localStorage.setItem("NumericLine", JSON.stringify(resultString));
    highlightTableCellForTime(symbolBefore, currentState, delayTime);

    const turingMachineNext = document.querySelector(".turing-machine-next");
    if (!turingMachineNext.classList.contains("hidden")) {
      clickLookTraceButton();
    }

    if (index === data.length - 1) {
      showNewResult(tape);
      nextStepButton.classList.toggle("hidden");
    }
  }
}

function viewAutoDelay(data, selectedSpeed) {
  let delayTime = 0;
  // Установка времени задержки в зависимости от выбранной скорости
  switch (selectedSpeed) {
    case "slow":
      delayTime = 3000; // Медленный
      break;
    case "medium":
      delayTime = 1000; // Средний
      break;
    case "fast":
      delayTime = 200; // Быстрый
      break;
    default:
      delayTime = 6000; // По умолчанию устанавливаем медленную скорость
  }
  let index = 0;
  let tape = "";
  let indexRes = 0;
  updateAndStoreTraces(data); // Отправляем все трассы в локальное хранилище
  const interval = setInterval(() => {
    if (index < data.length) {
      let symbolBefore; // Объявление переменной symbolBefore за пределами условия
      indexRes = 0;
      const currentTrace = data[index];
      let currentState = currentTrace.currentState;
      const caretPosition = currentTrace.currentCaretPosition;
      let tape = currentTrace.tape;
      symbolBefore = tape.charAt(caretPosition); // Установка начального значения symbolBefore
      if (currentState === "HALT" && index > 0) {
        currentState = data[index - 1].currentState; // Присваиваем состояние из предыдущей итерации
        // Получение symbolBefore из предыдущей итерации
        const previousCaretPosition = data[index - 1].currentCaretPosition;
        const previousTape = data[index - 1].tape;
        symbolBefore = previousTape.charAt(previousCaretPosition);
      }
      localStorage.setItem("currentStatusTrace", index + 1); // Назначаем currentStatusTrace
      // Получение массива трасс из локального хранилища
      const traces = JSON.parse(localStorage.getItem("traces")) || [];
      // Получение требуемой трассы из массива трасс по индексу
      let resultString = traces[index];
      resultString = "_".concat(resultString);
      highlightNewLine2(resultString, true); // Отображаем строку в ленте
      localStorage.setItem("NumericLine", JSON.stringify(resultString));
      //highlightTableCell(symbolBefore, currentState);
      highlightTableCellForTime(symbolBefore, currentState, delayTime); // Закрашиваем нужную ячейку в таблице
      const turingMachineNext = document.querySelector(".turing-machine-next");

      if (!turingMachineNext.classList.contains("hidden")) {
        clickLookTraceButton();
      }
      indexRes += index;
      index++;
      //console.log(indexRes);
      if (indexRes === data.length - 1) {
        showNewResult(tape); // Отображаем числовой результат
      }
    } else {
      clearInterval(interval);
    }
  }, delayTime);
}

function viewAuto(data) {
  //отображение только последней позиции
  const lastEntry = data[data.length - 1];
  updateAndStoreTraces(data); //отправляем все трассы в localstorage
  if (lastEntry) {
    const currentState = data[data.length - 2].currentState;
    const caretPosition = lastEntry.currentCaretPosition;
    const tape = lastEntry.tape;
    const tapeSymbHalt = data[data.length - 2].tape;
    const symbolBefore = tapeSymbHalt.charAt(caretPosition);
    localStorage.setItem("currentStatusTrace", data.length); // назначение currentStatusTrace
    const resultString = updateAndPasteNewLine(caretPosition, tape, false); // функция превращает строку в нужный формат - определенной длины

    highlightNewLine(resultString, false); // отобразить последнюю строку в ленте
    localStorage.setItem("NumericLine", JSON.stringify(resultString));
    highlightTableCell(symbolBefore, currentState); // закрасить нужную ячейку в таблице
    showNewResult(tape); //отобразить числовой результат
    clickLookTraceButton(); // обновление окна со всеми трассами с значением currentStatusTrace
  } else {
    console.log("Недостаточно данных для обработки.");
  }
}
function clickLookTraceButton() {
  const clickEvent = new Event("click");
  const lookTraceButton = document.getElementById("lookTraceButton");
  lookTraceButton.dispatchEvent(clickEvent);
}
function showNewResult(resultString) {
  const containerResult = document.querySelector(".new-res");
  if (containerResult) {
    containerResult.innerHTML = "";
    const textResult = document.createElement("p");
    const textDivResult = resultString.replace(/_/g, "").length;
    textResult.textContent = `Итоговый результат: ${textDivResult}`;
    containerResult.appendChild(textResult);
  } else {
    console.error("Container element not found");
  }
}
function updateAndStoreTraces(data) {
  const traces = [];
  data.forEach((entry) => {
    const { tape, currentCaretPosition } = entry;
    const str = updateAndPasteNewLine(currentCaretPosition, tape, true);
    traces.push(str);
  });
  localStorage.setItem("traces", JSON.stringify(traces));
}
function highlightNewLine2(getString, isdelayStr) {
  let resultString = "";
  if (isdelayStr) {
    resultString = getString.slice(1);
    resultString = "_" + resultString;
  } else {
    resultString = getString;
  }
  // for (let i = 0; i < resultString.length; i++) {
  //   console.log(`Символ с номером ${i}: ${resultString[i]}`);
  // }
  const tapeSymbolsContainer = document.getElementById("tape-symbols");
  tapeSymbolsContainer.innerHTML = "";
  const middleIndex = 14;
  //const tapeSymbols = [];
  for (let i = 0; i < 26; i++) {
    const tapeSymbol = document.createElement("button");
    tapeSymbol.classList.add("tape-symbol");

    tapeSymbol.textContent = resultString[i];
    //tapeSymbols.push(resultString[i]);

    if (i === middleIndex) {
      tapeSymbol.classList.add("center-symbol");
    }

    tapeSymbolsContainer.appendChild(tapeSymbol);
  }
}
function highlightNewLine(getString, isdelayStr) {
  let resultString = "";
  if (isdelayStr) {
    resultString = getString.slice(1);
    resultString = "_" + resultString;
  } else {
    resultString = getString;
  }
  for (let i = 0; i < resultString.length; i++) {
    //console.log(`Символ с номером ${i}: ${resultString[i]}`);
  }

  const tapeSymbolsContainer = document.getElementById("tape-symbols");
  tapeSymbolsContainer.innerHTML = "";
  const middleIndex = Math.floor(resultString.length / 2) + 1;
  //const tapeSymbols = [];
  for (let i = 0; i < 27; i++) {
    const tapeSymbol = document.createElement("button");
    tapeSymbol.classList.add("tape-symbol");

    tapeSymbol.textContent = resultString[i];
    //tapeSymbols.push(resultString[i]);

    if (i === middleIndex) {
      tapeSymbol.classList.add("center-symbol");
    }

    tapeSymbolsContainer.appendChild(tapeSymbol);
  }
}
function updateAndPasteNewLine(
  currentCaretPosition,
  tapeString,
  ifUpdatingTraces
) {
  const positionAsNumber = parseInt(currentCaretPosition, 10);
  let symbolToRemember = 0;
  if (!isNaN(positionAsNumber) && positionAsNumber < tapeString.length) {
    let leftPart = "";
    let rightPart = "";
    if (ifUpdatingTraces) {
      symbolToRemember = tapeString[positionAsNumber];
      leftPart = tapeString.substring(0, positionAsNumber);
      rightPart = tapeString.substring(positionAsNumber + 1);
    } else {
      symbolToRemember = tapeString[positionAsNumber - 1];
      leftPart = tapeString.substring(0, positionAsNumber - 1);
      rightPart = tapeString.substring(positionAsNumber + 1);
    }
    while (leftPart.length < 13) {
      leftPart = "_" + leftPart;
    }
    while (rightPart.length < 13) {
      rightPart = rightPart + "_";
    }
    while (leftPart.length > 13) {
      leftPart = leftPart.substring(1);
    }
    while (rightPart.length > 13) {
      rightPart = rightPart.substring(0, rightPart.length - 1);
    }

    const resultStringPre = leftPart + symbolToRemember + rightPart;
    return resultStringPre;
  } else {
    console.log("Некорректная позиция символа.");
  }
}
function highlightTableCellForTime(rowSymbol, columnState, delayTime) {
  const alphabetInput = document.getElementById("alphabet-input");
  const alphabet = alphabetInput.value;
  const stateTable = document.querySelector(".statetable");

  const tableRows = stateTable.querySelectorAll("tbody tr:not(:first-child)");

  // Установка всех ячеек в белый цвет
  tableRows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    cells.forEach((cell) => {
      cell.style.backgroundColor = "white";
    });
  });

  let rowIndex = -1;
  let columnIndex = -1;

  // Находим индекс строки символов
  rowIndex = alphabet.indexOf(rowSymbol) + 1;

  // Получаем числовую часть columnState
  const stateNumber = Number(columnState.slice(1));

  // Определяем columnIndex в зависимости от числовой части columnState
  columnIndex = stateNumber * 3 + 1;

  // Если индексы найдены, окрашиваем ячейки
  if (rowIndex !== -1 && columnIndex !== -1) {
    const previousColor = []; // Массив для хранения предыдущих цветов

    for (let i = columnIndex; i < columnIndex + 3; i++) {
      const cell = stateTable
        .querySelectorAll("tr")
        [rowIndex + 1].querySelectorAll("td")[i];
      previousColor.push(cell.style.backgroundColor); // Сохраняем предыдущий цвет

      // Окрашиваем ячейку в желтый цвет
      cell.style.backgroundColor = "yellow";
    }

    // Восстановление предыдущего цвета после некоторой задержки
    // setTimeout(() => {
    //   for (let i = columnIndex; i < columnIndex + 3; i++) {
    //     const cell = stateTable
    //       .querySelectorAll("tr")
    //       [rowIndex + 1].querySelectorAll("td")[i];
    //     cell.style.backgroundColor = previousColor[i - columnIndex]; // Восстанавливаем предыдущий цвет
    //   }
    // }, delayTime); // Пример времени задержки, здесь можно использовать delayTime из предыдущей функции
  }
}

function highlightTableCell(rowSymbol, columnState) {
  const alphabetInput = document.getElementById("alphabet-input");
  const alphabet = alphabetInput.value;
  const stateTable = document.querySelector(".statetable");

  const tableRows = stateTable.querySelectorAll("tbody tr:not(:first-child)");
  const rowsArray = Array.from(tableRows);

  let rowIndex = -1;
  let columnIndex = -1;

  // Находим индекс строки символов
  const symbolRow = rowsArray.find((row, index) => {
    const cells = row.querySelectorAll("td");
    const symbols = Array.from(cells).map((cell) => cell.textContent);
    const foundIndex = symbols.indexOf(rowSymbol);
    if (foundIndex !== -1) {
      rowIndex = index + 1;
      return true;
    }
    return false;
  });
  rowIndex = alphabet.indexOf(rowSymbol) + 1;

  // Получаем числовую часть columnState
  const stateNumber = Number(columnState.slice(1));

  // Определяем columnIndex в зависимости от числовой части columnState
  columnIndex = stateNumber * 3 + 1;

  // Если индексы найдены, окрашиваем ячейки
  if (rowIndex !== -1 && columnIndex !== -1) {
    for (let i = columnIndex; i < columnIndex + 3; i++) {
      stateTable.querySelectorAll("tr")[rowIndex + 1].querySelectorAll("td")[
        i
      ].style.backgroundColor = "yellow";
    }
  }
}

function getFinalAlphabet() {
  let symbolicLine = JSON.parse(localStorage.getItem("SymbolicLine")) || [];
  const storedOperands = localStorage.getItem("NumericLine");
  let operand1 = 0,
    operand2 = 0;

  const parsedOperands = JSON.parse(storedOperands);
  if (parsedOperands) {
    try {
      operand1 = parsedOperands.operand1;
      operand2 = parsedOperands.operand2;
    } catch (e) {
      console.log(e);
    }
  }

  symbolicLine = symbolicLine.filter((symbol) => symbol !== "_");

  if ((symbolicLine.length !== 0 && operand1 === undefined) || operand1 === 0) {
    let symbolicLine = JSON.parse(localStorage.getItem("SymbolicLine"));
    console.log(symbolicLine);
    while (symbolicLine[0] === "_") {
      symbolicLine.shift();
    }
    while (symbolicLine[symbolicLine.length - 1] === "_") {
      symbolicLine.pop();
    }

    if (symbolicLine[0] !== "_") {
      symbolicLine.unshift("_");
    }
    if (symbolicLine[symbolicLine.length - 1] !== "_") {
      symbolicLine.push("_");
    }
    return symbolicLine.join("");
  } else {
    // console.log(operand1, operand2);
    if (!isNaN(operand1) && !isNaN(operand2)) {
      numericLine =
        "_" + "*".repeat(operand1) + "x" + "*".repeat(operand2) + "_";
    }
    console.log(numericLine);
    return numericLine;
  }
}
// Функция для установки состояния элементов в неактивное
function setElementsDisabled() {
  const radioInputs = document.querySelectorAll(
    '.radio-label input[type="radio"]'
  );
  const textInputs = document.querySelectorAll(".operand-input-field");
  const alphabetInput = document.getElementById("alphabet-input");
  const basicAlgorithmSelect = document.getElementById("basicAlgorithmSelect");
  const customAlgorithmSelect = document.getElementById(
    "customAlgorithmSelect"
  );
  const stateSelectChng = document.getElementById("state-select");
  const executionModeSelect = document.getElementById("execution-mode");
  const executionSpeedSelect = document.getElementById("execution-speed");
  const actionButtons = document.querySelectorAll(".action-selection button");
  const numericRadio = document.querySelector('input[value="numeric"]');

  numericRadio.checked = true;
  const event = new Event("change");
  numericRadio.dispatchEvent(event);

  localStorage.setItem("isWorkingWithReadyAlgorithm", "true");
  updateTableData();
  moveLeftButton.classList.toggle("hidden");
  moveRightButton.classList.toggle("hidden");
  radioInputs.forEach((input) => {
    input.disabled = true;
  });

  textInputs.forEach((input) => {
    input.disabled = true;
  });

  alphabetInput.disabled = true;
  basicAlgorithmSelect.disabled = true;
  customAlgorithmSelect.disabled = true;
  stateSelectChng.disabled = true;
  executionModeSelect.disabled = true;
  executionSpeedSelect.disabled = true;

  actionButtons.forEach((button) => {
    button.disabled = true;
  });
}

// Функция для снятия неактивного состояния с элементов
function setElementsEnabled() {
  const radioInputs = document.querySelectorAll(
    '.radio-label input[type="radio"]'
  );
  const textInputs = document.querySelectorAll(".operand-input-field");
  const alphabetInput = document.getElementById("alphabet-input");
  const basicAlgorithmSelect = document.getElementById("basicAlgorithmSelect");
  const customAlgorithmSelect = document.getElementById(
    "customAlgorithmSelect"
  );
  const stateSelectChng = document.getElementById("state-select");
  const executionModeSelect = document.getElementById("execution-mode");
  const executionSpeedSelect = document.getElementById("execution-speed");
  const actionButtons = document.querySelectorAll(".action-selection button");
  const symbolicRadio = document.querySelector('input[value="symbolic"]');
  symbolicRadio.checked = true;
  const event = new Event("change");
  symbolicRadio.dispatchEvent(event);
  localStorage.setItem("isWorkingWithReadyAlgorithm", "false");
  updateTableData();
  moveLeftButton.classList.toggle("hidden");
  moveRightButton.classList.toggle("hidden");
  radioInputs.forEach((input) => {
    input.disabled = false;
  });

  textInputs.forEach((input) => {
    input.disabled = false;
  });

  alphabetInput.disabled = false;
  basicAlgorithmSelect.disabled = false;
  customAlgorithmSelect.disabled = false;
  stateSelectChng.disabled = false;
  executionModeSelect.disabled = false;
  executionSpeedSelect.disabled = false;

  actionButtons.forEach((button) => {
    button.disabled = false;
  });
}
