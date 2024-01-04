document.addEventListener("DOMContentLoaded", function () {
  //localStorage.removeItem("objectsArray");
  localStorage.removeItem("isWorkingWithReadyAlgorithm");
  localStorage.removeItem("ExportAlgData");
  if (
    window.location.pathname === "/index.html" ||
    localStorage.getItem("isCreatingNew") === "true"
  ) {
    if (localStorage.getItem("isRefactoring") !== "true") {
      localStorage.removeItem("isRefactoringGlobal");
      localStorage.removeItem("isRefactoring");
      localStorage.removeItem("objectsArray");
      const stateHeaders = ["q0", "q1"];
      localStorage.setItem("stateHeaders", JSON.stringify(stateHeaders));
    }
  }
  localStorage.removeItem("ExportTrcData");
  localStorage.removeItem("currentStatusTrace");
  const alphabetInput = document.getElementById("alphabet-input");

  updateTableData();
  alphabetInput.addEventListener("input", function () {
    if (validateAlphabet(alphabetInput.value)) {
      alphabetAddColumnToLocalStorage();
      updateTableData();
    }
  });
  updateStateList();
});

// Функция для обновления tableData по значению инпута "alphabet-input"
function updateTableData() {
  const isRef = localStorage.getItem("isRefactoring");
  const alphabetInput = document.getElementById("alphabet-input");
  let alphabet = document.getElementById("alphabet-input").value.split("");
  if (isRef) {
    let alphabetValue = localStorage.getItem("alphabetValue");
    alphabetValue = alphabetValue.split(""); // Преобразование строки в массив
    alphabetValue = alphabetValue.join(""); // Обратное преобразование массива в строку

    alphabetInput.value = alphabetValue;
    const event = new Event("input", {
      bubbles: true,
      cancelable: true,
    });
    alphabetInput.dispatchEvent(event);
  } else {
    alphabetValue = document.getElementById("alphabet-input").value;
  }
  const tableData = [];
  alphabet.forEach((symbol) => {
    const foundSymbol = tableData.find((item) => item.tapeSymbol === symbol);

    if (!foundSymbol) {
      tableData.push({
        tapeSymbol: symbol,
        stateA: { write: "", move: "", nextState: "" },
      });
    }
  });
  createTable(tableData);
  if (isRef) {
    localStorage.removeItem("isRefactoring");
    // alphabetAddColumnToLocalStorage();
    updateTableData();
  }
}

function createTable(tableData) {
  const tableContainer = document.querySelector(".table-overflow");
  tableContainer.innerHTML = "";
  let alphabetValue = document.getElementById("alphabet-input").value.split("");
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];

  // Сортировка значений stateHeaders
  stateHeaders.sort((a, b) => {
    // Извлечь числа из строк "q<число>"
    const numA = parseInt(a.slice(1), 10);
    const numB = parseInt(b.slice(1), 10);

    // Сравнить числа для правильной сортировки
    return numA - numB;
  });
  const table = document.createElement("table");
  table.classList.add("statetable");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");
  const tapeSymbolHeader = document.createElement("th");
  tapeSymbolHeader.textContent = "";
  headerRow.appendChild(tapeSymbolHeader);
  stateHeaders.forEach((stateHeader) => {
    const stateHeaderCell = document.createElement("th");
    stateHeaderCell.colSpan = 3;
    stateHeaderCell.textContent = `${stateHeader}`;
    const closeIcon = document.createElement("span");
    closeIcon.classList.add("close-icon");
    closeIcon.textContent = ""; // на будущее добавить уже функционал с ×
    stateHeaderCell.appendChild(closeIcon);
    headerRow.appendChild(stateHeaderCell);
  });

  // Определяем количество столбцов на основе количества элементов в stateHeaders
  const totalColumns = stateHeaders.length * 3 + 1; // Каждый столбец состоит из трех ячеек, плюс одна ячейка для tapeSymbol
  const instructionLabelsRow = document.createElement("tr");
  const instructionLabels = [
    "Переместить ленту",
    "Написать символ",
    "Следующее состояние",
  ];
  for (let i = 0; i < totalColumns; i++) {
    const instructionLabelCell = document.createElement("td");
    if (i === 0) {
      instructionLabelCell.textContent = "Символ ленты";
      instructionLabelsRow.appendChild(instructionLabelCell);
    } else {
      instructionLabelCell.textContent = instructionLabels[i % 3];
      instructionLabelsRow.appendChild(instructionLabelCell);
    }
  }

  tbody.appendChild(headerRow);
  tbody.appendChild(instructionLabelsRow);

  let buildingstring = 0,
    buildInput = 0;
  const storedData = JSON.parse(localStorage.getItem("objectsArray")) || [];
  const isWorkingWithReadyAlgorithm = localStorage.getItem(
    "isWorkingWithReadyAlgorithm"
  );
  if (isWorkingWithReadyAlgorithm) {
    tableData.forEach((data) => {
      const { tapeSymbol, stateA, stateB } = data;
      const dataRow = document.createElement("tr");
      const tapeSymbolCell = document.createElement("td");
      tapeSymbolCell.textContent = tapeSymbol;
      dataRow.appendChild(tapeSymbolCell);

      const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
        "q0",
        "q1",
      ];
      stateHeaders.sort((a, b) => a.localeCompare(b));

      const states = stateHeaders.map((header, index) => index + 1);
      buildInput = 0;
      states.forEach((state) => {
        const { write, move, nextState } = state;

        const writeCell = document.createElement("td");
        const moveCell = document.createElement("td");
        const nextStateCell = document.createElement("td");

        let valueFromStoredData = storedData[buildingstring][buildInput];

        writeCell.textContent =
          valueFromStoredData !== "" ? valueFromStoredData : "";
        dataRow.appendChild(writeCell);
        buildInput++; // Увеличиваем индекс для следующего столбца
        valueFromStoredData = storedData[buildingstring][buildInput];
        moveCell.textContent =
          valueFromStoredData !== "" ? valueFromStoredData : "";
        dataRow.appendChild(moveCell);
        buildInput++; // Увеличиваем индекс для следующего столбца
        valueFromStoredData = storedData[buildingstring][buildInput];

        nextStateCell.textContent =
          valueFromStoredData !== "" ? valueFromStoredData : "";
        dataRow.appendChild(nextStateCell);

        buildInput++; // Увеличиваем индекс для следующего столбца
      });

      buildingstring++; // Увеличиваем индекс строки для следующей итерации

      tbody.appendChild(dataRow);
    });
  } else {
    tableData.forEach((data) => {
      const { tapeSymbol, stateA, stateB } = data;
      const dataRow = document.createElement("tr");
      const tapeSymbolCell = document.createElement("td");
      tapeSymbolCell.textContent = tapeSymbol;
      dataRow.appendChild(tapeSymbolCell);
      const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
        "q0",
        "q1",
      ];
      stateHeaders.sort((a, b) => a.localeCompare(b)); // Сортировка с использованием локализации для строк
      const states = stateHeaders
        .sort((a, b) => a.localeCompare(b))
        .map((header, index) => index + 1);
      states.forEach((state) => {
        const { write, move, nextState } = state;
        const selectCells = [write, move, nextState];
        selectCells.forEach((value, index) => {
          const selectCell = document.createElement("td");
          const select = document.createElement("select");
          let options;
          if (index === 0) {
            // Для первого столбца options - tapeSymbol из tableData
            options = tableData.map((item) => item.tapeSymbol);
          } else if (index === 1) {
            // Для третьего столбца options - stateHeaders
            options = stateHeaders;
            options.push("HALT");
            options = Array.from(new Set(options));
          } else {
            // Для второго столбца options - 'L', 'N', 'R'
            options = ["L", "N", "R"];
          }
          options.forEach((optionValue) => {
            const option = document.createElement("option");
            option.value = option.textContent = optionValue;
            select.appendChild(option);
          });
          // Установка выбранного значения из сохраненных данных или значения по умолчанию
          const storedValue = storedData[buildingstring]
            ? storedData[buildingstring][buildInput]
            : null;
          select.value = storedValue;
          // console.log(select.value);
          selectCell.appendChild(select);
          dataRow.appendChild(selectCell);
          // Инкрементирование переменных для следующей итерации
          buildInput++;
        });
      });
      buildingstring++;
      buildInput = 0;
      tbody.appendChild(dataRow);
    });
  }
  localStorage.removeItem("isWorkingWithReadyAlgorithm");
  table.appendChild(tbody);
  tableContainer.appendChild(table);
  //alphabetAddColumnToLocalStorage();
}

const stateSelect = document.getElementById("state-select");
const warningText = document.getElementById("warningState");
const addRightButton = document.querySelector(".add-right-button");
const addLeftButton = document.querySelector(".add-left-button");
const deleteStateButton = document.querySelector(".delete-state-button");

function updateStateList() {
  stateSelect.innerHTML = ""; // Очищаем текущий список
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];
  stateHeaders.sort((a, b) => {
    // Извлечь числа из строк "q<число>"
    const numA = parseInt(a.slice(1), 10);
    const numB = parseInt(b.slice(1), 10);

    // Сравнить числа для правильной сортировки
    return numA - numB;
  });
  // Создаем пустой элемент
  const emptyOption = document.createElement("option");
  emptyOption.textContent = "";
  emptyOption.disabled = true; // Делаем его неактивным
  emptyOption.selected = true; // Делаем его выбранным по умолчанию

  // Добавляем пустой элемент в начало списка
  stateSelect.appendChild(emptyOption);

  // Добавляем остальные элементы из stateHeaders
  if (stateHeaders) {
    stateHeaders.forEach((header) => {
      const option = document.createElement("option");
      option.value = option.textContent = header;
      stateSelect.appendChild(option);
    });
  }
}

// Вызываем функцию обновления списка при загрузке страницы
updateStateList();

// Функция для проверки выбора состояния и отображения ошибки
function checkStateSelection() {
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];
  //console.log(localStorage.getItem("isWorkingWithReadyAlgorithm"));
  if (stateSelect.value === "") {
    warningText.textContent = "Выберите состояние!";
    return false;
  } else if (localStorage.getItem("isWorkingWithReadyAlgorithm") === "true") {
    warningText.textContent =
      "Не возможно добавить состояние в существуюший алгоритм";
    setTimeout(() => {
      warningText.textContent = "";
    }, 3000);
    return false;
  } else if (stateHeaders.length === 1) {
    warningText.textContent =
      "Невозможно удалить единственное оставшееся состояние. Должно оставаться как минимум одно состояние в таблице.";
    return false;
  } else {
    warningText.textContent = "";
    return true;
  }
}

// Собираем данные из всех инпутов
function addColumnToLocalStorage(position, check) {
  const table = document.querySelector(".statetable tbody");
  const allInputs = table.querySelectorAll("select");
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];
  const inputsData = [];
  allInputs.forEach((input) => {
    inputsData.push(input.value);
  });
  const objectsArray = [];
  const states = stateHeaders
    .sort((a, b) => a.localeCompare(b))
    .map((header, index) => index + 1);
  const objectsCount = inputsData.length / ((states.length - 1) * 3);

  for (let i = 0; i < objectsCount; i++) {
    const emptyStrings = [];
    for (let j = 0; j < 3; j++) {
      emptyStrings.push("");
    }
    const startIndex = i * ((states.length - 1) * 3);
    const endIndex = startIndex + (states.length - 1) * 3;
    const objectData = inputsData.slice(startIndex, endIndex);
    if (check) {
      objectData.splice((position + 1) * 3, 0, ...emptyStrings);
    } else {
      objectData.splice(position * 3, 0, ...emptyStrings);
    }
    objectsArray.push(objectData);
  }
  // console.log(objectData);
  // Конвертируем данные в JSON и сохраняем в localStorage
  localStorage.setItem("objectsArray", JSON.stringify(objectsArray));
}
function alphabetAddColumnToLocalStorage() {
  const table = document.querySelector(".statetable tbody");
  const allInputs = table.querySelectorAll("select");
  const alphabetInput = document.getElementById("alphabet-input");
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];
  const inputsData = [];
  allInputs.forEach((input) => {
    inputsData.push(input.value);
  });
  const objectsArray = [];
  const states = stateHeaders
    .sort((a, b) => a.localeCompare(b))
    .map((header, index) => index + 1);
  const objectsCount = inputsData.length / (states.length * 3);

  for (let i = 0; i < objectsCount; i++) {
    const startIndex = i * (states.length * 3);
    const endIndex = startIndex + states.length * 3;
    const objectData = inputsData.slice(startIndex, endIndex);
    objectsArray.push(objectData);
  }
  // Конвертируем данные в JSON и сохраняем в localStorage
  localStorage.setItem("objectsArray", JSON.stringify(objectsArray));
  localStorage.setItem("alphabetValue", JSON.stringify(alphabetInput.value));
}

addRightButton.addEventListener("click", function () {
  if (checkStateSelection()) {
    const selectedState = stateSelect.value;
    const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
      "q0",
      "q1",
    ];
    stateHeaders.sort((a, b) => {
      // Извлечь числа из строк "q<число>"
      const numA = parseInt(a.slice(1), 10);
      const numB = parseInt(b.slice(1), 10);

      // Сравнить числа для правильной сортировки
      return numA - numB;
    });
    const index = stateHeaders.findIndex((header) => header === selectedState);
    if (index !== -1) {
      const newState = `q${stateHeaders.length}`;
      stateHeaders.splice(index + 1, 0, newState);

      localStorage.setItem("stateHeaders", JSON.stringify(stateHeaders));

      addColumnToLocalStorage(index, 1);
      updateTableData();
      updateStateList();
    }
  }
});

addLeftButton.addEventListener("click", function () {
  if (checkStateSelection()) {
    const selectedState = stateSelect.value;
    const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
      "q0",
      "q1",
    ];
    stateHeaders.sort((a, b) => {
      // Извлечь числа из строк "q<число>"
      const numA = parseInt(a.slice(1), 10);
      const numB = parseInt(b.slice(1), 10);

      // Сравнить числа для правильной сортировки
      return numA - numB;
    });
    const index = stateHeaders.findIndex((header) => header === selectedState);
    if (index !== -1 && index >= 0) {
      const newState = `q${stateHeaders.length}`;
      stateHeaders.splice(index, 0, newState);

      localStorage.setItem("stateHeaders", JSON.stringify(stateHeaders));
      addColumnToLocalStorage(index, 0);
      updateTableData();
      updateStateList();
    }
  }
});

function removeStateFromLocalStorage(position) {
  const table = document.querySelector(".statetable tbody");
  const allInputs = table.querySelectorAll("select");
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];
  const inputsData = [];
  const objectsArray = [];
  const states = stateHeaders
    .sort((a, b) => a.localeCompare(b))
    .map((header, index) => index + 1);
  allInputs.forEach((input) => {
    inputsData.push(input.value);
  });
  //inputsData.splice(position+1, 9);
  const objectsCount = inputsData.length / (states.length * 3);
  console.log(objectsCount);
  for (let i = 0; i < objectsCount; i++) {
    const startIndex = i * (states.length * 3);
    const endIndex = startIndex + states.length * 3;
    const objectData = inputsData.slice(startIndex, endIndex);
    objectsArray.push(objectData);
  }
  objectsArray.forEach((arr) => {
    arr.splice(position * 3, 3);
  });
  localStorage.setItem("objectsArray", JSON.stringify(objectsArray));
}
function ChangeHeadersDelete(position) {
  const table = document.querySelector(".statetable tbody");
  const allInputs = table.querySelectorAll("select");
  const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
    "q0",
    "q1",
  ];
  const objectsArray = [];
  stateHeaders.sort((a, b) => {
    // Извлечь числа из строк "q<число>"
    const numA = parseInt(a.slice(1), 10);
    const numB = parseInt(b.slice(1), 10);

    // Сравнить числа для правильной сортировки
    return numA - numB;
  });
  for (let i = 0; i < stateHeaders.length; i++) {
    const expectedState = `q${i}`;
    if (stateHeaders[i] !== expectedState) {
      stateHeaders[i] = `q${i}`;
    }
  }

  const removeEmptyStrings = (arr, pos) => {
    for (let i = 0; i < arr.length; i++) {
      const emptyStringsIndex = pos * 3;
      const data = arr[i];
      data.splice(emptyStringsIndex, 3);
    }
  };

  removeEmptyStrings(objectsArray, position);
  localStorage.setItem("stateHeaders", JSON.stringify(stateHeaders));
}

deleteStateButton.addEventListener("click", function () {
  if (checkStateSelection()) {
    const selectedState = stateSelect.value;
    const stateHeaders = JSON.parse(localStorage.getItem("stateHeaders")) || [
      "q0",
      "q1",
    ];
    stateHeaders.sort((a, b) => {
      // Извлечь числа из строк "q<число>"
      const numA = parseInt(a.slice(1), 10);
      const numB = parseInt(b.slice(1), 10);

      // Сравнить числа для правильной сортировки
      return numA - numB;
    });
    const index = stateHeaders.findIndex((header) => header === selectedState);

    if (index !== -1) {
      removeStateFromLocalStorage(index);
      stateHeaders.splice(index, 1);

      localStorage.setItem("stateHeaders", JSON.stringify(stateHeaders));

      ChangeHeadersDelete(index);
      updateTableData();
      updateStateList();
    }
  }
});

const importButton = document.querySelector(".custom-button-import-alg");
const modal = document.getElementById("modal"); // Элемент модального окна
const nameInput = document.getElementById("name-input");
const fileInput = document.getElementById("file-input");
const importActionButton = document.getElementById("import-action-button");
const nameError = document.querySelector(".name-error");
const fileError = document.querySelector(".file-error");

importButton.addEventListener("click", () => {
  nameError.textContent = "";
  fileError.textContent = "";
  modal.style.display = "block"; // Показываем модальное окно
});

// Закрываем модальное окно при клике на кнопку "Закрыть"
const closeButtonModal = document.getElementById("close-buttonModal");
closeButtonModal.addEventListener("click", () => {
  modal.style.display = "none"; // Скрываем модальное окно
});
nameInput.addEventListener("input", function () {
  if (
    !nameInput.value ||
    nameInput.value.length < 3 ||
    nameInput.value.length > 30
  ) {
    nameError.textContent = "Название должно содержать от 3 до 30 символов";
  } else {
    nameError.textContent = ""; // Очищаем ошибку
  }
});
importActionButton.addEventListener("click", () => {
  localStorage.setItem("isImporting", "true");
  // Проверка наличия значения в поле "Название"
  if (
    !nameInput.value ||
    nameInput.value.length < 3 ||
    nameInput.value.length > 30
  ) {
    nameError.textContent = "Название должно содержать от 3 до 30 символов";
    return;
  } else if (!checkIfNameExists(nameInput.value)) {
    nameError.textContent = "Алгоритм с таким названием уже существует";
    return;
  } else {
    nameError.textContent = ""; // Очищаем ошибку
  }

  // Проверка файла
  const filePath = fileInput.value;
  const allowedExtensions = /(\.turing)$/i;
  if (!allowedExtensions.exec(filePath)) {
    fileError.textContent = "Должен быть загружен файл с расширением .turing";
    return;
  } else {
    fileError.textContent = ""; // Очищаем ошибку
  }

  // Чтение содержимого файла
  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    const fileContent = reader.result;
    const importedAlgorithm = JSON.parse(fileContent); // Распаковываем JSON из файла

    // Замена значения в поле name на введенное пользователем
    importedAlgorithm.name = nameInput.value;
    importedAlgorithm.basic = false;
    const jsonOutput = JSON.stringify(importedAlgorithm, null, 2);
    //console.log(JSON.stringify(importedAlgorithm, null, 2));
    fetch("http://localhost:8100/algorythm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: jsonOutput,
    })
      .then((response) => {
        if (response.ok) {
          const isSuccess = true; // Или любое другое значение в зависимости от условий
          // Сохраняем значение в localStorage
          localStorage.setItem("isSuccess", isSuccess);
          // Перенаправляем на другую страницу
          location.reload();
          localStorage.removeItem("isImporting");
        } else {
          localStorage.setItem("isSuccess", false);
          // Перенаправляем на другую страницу
          location.reload();
          localStorage.removeItem("isImporting");
        }
      })
      .catch((error) => {
        const errorText = document.querySelector(".error-form__text");
        errorText.textContent = `Ошибка при выполнении запроса${error}`;
        showErrorForm();
      });
  };

  reader.readAsText(file); // Читаем файл как текст
});

// Функция для проверки наличия файла по указанному пути
function checkFileExists(url) {
  return fetch(url, { method: "HEAD" })
    .then((response) => {
      return response.ok;
    })
    .catch((error) => {
      console.error("Ошибка при проверке файла:", error);
      return false;
    });
}

document.querySelectorAll(".button-link-pageNext").forEach((button) => {
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const href = button.getAttribute("href");

    const fileExists = await checkFileExists(href);

    if (fileExists) {
      window.open(href, "_blank");
    } else {
      handleInputErrorNoSuchFile();
    }
  });
});
