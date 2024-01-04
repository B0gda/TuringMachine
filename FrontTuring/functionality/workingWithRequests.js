document.addEventListener("DOMContentLoaded", function () {
  const basicDropdown = document.getElementById("basicAlgorithmSelect");
  const customDropdown = document.getElementById("customAlgorithmSelect");
  // Функция для обработки события нажатия кнопки экспорта
  document
    .querySelector(".export-trc-data")
    .addEventListener("click", exportTrcData);
  document
    .querySelector(".export-alg-data")
    .addEventListener("click", exportAlgData);
  // Отслеживаем изменения в списке базовых алгоритмов
  basicDropdown.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    customDropdown.value = "";
    getAlgorithmBody(selectedValue);
  });

  // Отслеживаем изменения в списке пользовательских алгоритмов
  customDropdown.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    basicDropdown.value = "";
    getAlgorithmBody(selectedValue);
  });

  async function getAlgorithmBody(selectedValue) {
    try {
      if (selectedValue !== "") {
        fetch(`http://localhost:8100/algorythm/${selectedValue}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error("Failed to fetch algorithm data");
            }
          })
          .then((data) => {
            console.log(data);
            localStorage.setItem("ExportAlgData", JSON.stringify(data));
            generateAlphabetInput(data);
            generateHeadersAndStates(data);
            localStorage.setItem("isWorkingWithReadyAlgorithm", "true");
            updateTableData();
            localStorage.setItem("isWorkingWithReadyAlgorithm", "true"); //для того,чтобы не работало добавление состояний
          })
          .catch((error) => {
            console.error("Error:", error.message);
          });
      }
    } catch {
      const errorText = document.querySelector(".error-form__text");
      errorText.textContent = "Не удалось получить тело алгоритма";
      showErrorForm(); //400-404
    }
  }
});

function generateAlphabetInput(data) {
  const alphabetInput = document.getElementById("alphabet-input");
  const alphabetValue = data.alphabet.split("").join("");

  alphabetInput.value = alphabetValue;
}

function generateHeadersAndStates(data) {
  const headers = [];
  const statesArray = [];
  data.symbols.forEach((symbol) => {
    const symbolStates = symbol.states;
    if (symbolStates) {
      const symbolHeaders = Object.keys(symbolStates);
      symbolHeaders.forEach((header) => {
        if (!headers.includes(header)) {
          headers.push(header);
        }
      });
      statesArray.push(symbolHeaders);
    }
  });
  // console.log("Headers:", headers);

  const objectsValue = [];
  const symbolsLength = data.symbols.length; //3
  const statesCount = headers.length; //4
  const alphabetValue = data.alphabet.split("").join("");
  const symbolInfoData = data.symbols;
  const sortedSymbolInfo = Object.values(symbolInfoData).sort((a, b) => {
    return alphabetValue.indexOf(a.symbol) - alphabetValue.indexOf(b.symbol);
  });
  // console.log(sortedSymbolInfo);
  for (let i = 0; i < symbolsLength; i++) {
    const symbolInfo = sortedSymbolInfo[i];

    const statesInfo = symbolInfo.states; //states:
    if (statesInfo) {
      let currentStateKeys = Object.keys(statesInfo); //[q0,q2]
      currentStateKeys.sort((a, b) => {
        // Извлечь числа из строк "q<число>"
        const numA = parseInt(a.slice(1), 10);
        const numB = parseInt(b.slice(1), 10);

        // Сравнить числа для правильной сортировки
        return numA - numB;
      });
      const symbolData = [];
      for (let j = 0; j < statesCount; j++) {
        let firstNonEmptyElement = "";
        for (let y = 0; y < currentStateKeys.length; y++) {
          if (currentStateKeys[y] !== "") {
            firstNonEmptyElement = currentStateKeys[y];
            break;
          }
        }
        const currentStateIndex = currentStateKeys.indexOf(headers[j]);
        let stringWithoutFirstChar = firstNonEmptyElement.substring(1);
        if (+stringWithoutFirstChar === j) {
          let currentState = [];
          for (let k = 0; k < currentStateKeys.length; k++) {
            if (currentStateKeys[k] !== "") {
              currentState = statesInfo[currentStateKeys[k]];
              break;
            }
          }
          symbolData.push(
            currentState.symbol,
            currentState.nextState,
            currentState.moveCaretOption
          );
          removeFirstNonEmpty(currentStateKeys);
        } else {
          symbolData.push("", "", "");
        }
      }
      objectsValue.push(symbolData);
    }
  }
  // console.log("Objects Value:", objectsValue);
  localStorage.setItem("stateHeaders", JSON.stringify(headers));
  localStorage.setItem("objectsArray", JSON.stringify(objectsValue));
}
function removeFirstNonEmpty(currentStateKeys) {
  for (let i = 0; i < currentStateKeys.length; i++) {
    if (currentStateKeys[i] !== "") {
      currentStateKeys[i] = "";
      break;
    }
  }
}

function exportTrcData() {
  const data = localStorage.getItem("ExportTrcData"); // Получаем данные из localStorage

  if (!data) {
    const errorText = document.querySelector(".error-form__text");
    errorText.textContent =
      "Нельзя экспортировать трассу, пока не был запущен ни один алгоритм";
    showErrorForm();
  } else {
    const filename = "exported_trace_data.turing"; // Имя файла по умолчанию

    const blob = new Blob([data], { type: "text/plain" }); // Создаем Blob из текстовых данных

    if (window.navigator.msSaveOrOpenBlob) {
      // Для Internet Explorer
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Создаем ссылку для скачивания файла
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = filename;

      // Добавляем ссылку на страницу и эмулируем клик для скачивания файла
      document.body.appendChild(link);
      link.click();

      // Освобождаем ресурсы
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
function exportAlgData() {
  const data = localStorage.getItem("ExportAlgData"); // Получаем данные из localStorage

  if (!data) {
    const errorText = document.querySelector(".error-form__text");
    errorText.textContent =
      "Нельзя экспортировать алгоритм, пока не был загружен в таблицу ни один алгоритм";
    showErrorForm();
  } else {
    const filename = "exported_algorithm_data.turing"; // Имя файла по умолчанию

    const blob = new Blob([data], { type: "text/plain" }); // Создаем Blob из текстовых данных

    if (window.navigator.msSaveOrOpenBlob) {
      // Для Internet Explorer
      window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Создаем ссылку для скачивания файла
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.download = filename;

      // Добавляем ссылку на страницу и эмулируем клик для скачивания файла
      document.body.appendChild(link);
      link.click();

      // Освобождаем ресурсы
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 0);
    }
  }
}
const customButton = document.querySelector(".custom-button-ref");
const createGoButton = document.querySelector(".custom-button-crt");
createGoButton.addEventListener("click", () => {
  localStorage.setItem("isCreatingNew", "true");
  localStorage.removeItem("isRefactoringGlobal");
  window.location.href = "./creator.html";
});
customButton.addEventListener("click", () => {
  const selectElement = document.getElementById("customAlgorithmSelect");
  const selectedValue = selectElement.value;
  const basicSelectElement = document.getElementById("basicAlgorithmSelect");
  const basicSelectedValue = basicSelectElement.value;
  if (basicSelectedValue !== "") {
    handleInputErrorChooseBasicAlg();
  } else if (selectedValue === "") {
    handleInputErrorNotChoosePersonalAlg();
  } else {
    const alphabetInputElement = document.getElementById("alphabet-input");
    const customAlgorithmSelect = document.getElementById(
      "customAlgorithmSelect"
    );

    const selectedIndex = customAlgorithmSelect.selectedIndex;
    const selectedOption = customAlgorithmSelect.options[selectedIndex];
    const selectedId = selectedOption.value;
    const selectedText = selectedOption.textContent;

    localStorage.setItem("selectedIdToRefactor", selectedId);
    localStorage.setItem("selectedTextToRefactor", selectedText);

    localStorage.removeItem("isCreatingNew");
    localStorage.setItem("alphabetValue", alphabetInputElement.value);
    localStorage.setItem("isRefactoringGlobal", "true");
    localStorage.setItem("isRefactoring", "true");
    window.location.href = "./creator.html";
  }
});
