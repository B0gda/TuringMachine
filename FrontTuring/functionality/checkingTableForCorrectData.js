function checkEveryRowCorrect(rowsArray, objectValues) {
  isCheck = true;
  rowsArray.forEach((row, index) => {
    const currentRowValues = objectValues[index]; // Получаем значения для текущей строки

    for (let i = 1; i < row.children.length - 1; i += 3) {
      const select1 = currentRowValues[i - 1];
      const select2 = currentRowValues[i];
      const select3 = currentRowValues[i + 1];

      const inputs = [select1, select2, select3];
      // console.log(inputs);

      if (inputs.some((input) => input === "")) {
        const emptyCount = inputs.filter((input) => input === "").length;
        // console.log(emptyCount);
        if (emptyCount === 1 || emptyCount === 2) {
          handleInputError();
          isCheck = false;
          row.children[i].style.backgroundColor = "red";
          row.children[i + 1].style.backgroundColor = "red";
          row.children[i + 2].style.backgroundColor = "red";

          return;
        } else {
          row.children[i].style.backgroundColor = "";
          row.children[i + 1].style.backgroundColor = "";
          row.children[i + 2].style.backgroundColor = "";
        }
      } else {
        row.children[i].style.backgroundColor = "";
        row.children[i + 1].style.backgroundColor = "";
        row.children[i + 2].style.backgroundColor = "";
      }
    }
  });
  return isCheck;
}
function checkOneHalt() {
  const tableRows = document.querySelectorAll(
    ".statetable tbody tr:not(:first-child)"
  );
  const rowsArray = Array.from(tableRows);
  rowsArray.shift();
  const objectValues = JSON.parse(localStorage.getItem("objectsArray"));

  let haltCount = 0;

  rowsArray.forEach((row, index) => {
    const currentRowValues = objectValues[index]; // Получаем значения для текущей строки

    for (let i = 1; i < row.children.length - 1; i += 3) {
      const select1 = currentRowValues[i - 1];
      const select2 = currentRowValues[i];
      const select3 = currentRowValues[i + 1];

      const inputs = [select1, select2, select3];

      if (inputs.includes("HALT")) {
        haltCount++;
        row.children[i].style.backgroundColor = "red"; // Изменение стиля первой ячейки
        row.children[i + 1].style.backgroundColor = "red"; // Изменение стиля второй ячейки
        row.children[i + 2].style.backgroundColor = "red"; // Изменение стиля третьей ячейки
      } else {
        row.children[i].style.backgroundColor = "";
        row.children[i + 1].style.backgroundColor = "";
        row.children[i + 2].style.backgroundColor = "";
      }
    }
  });

  // Если количество HALT больше 1, убираем подсветку из всех ячеек
  if (haltCount > 1 || haltCount == 0) {
    handleInputErrorHALT();
    return false;
  } else {
    rowsArray.forEach((row) => {
      for (let i = 1; i < row.children.length - 1; i += 3) {
        row.children[i].style.backgroundColor = "";
        row.children[i + 1].style.backgroundColor = "";
        row.children[i + 2].style.backgroundColor = "";
      }
    });
    return true;
  }
}
function isAlphabetTextValueEmpty() {
  const errorParagraph = document.querySelector(".alph-error");

  if (errorParagraph.textContent === "") {
    return true;
  } else {
    handleInputErrorAlphabet();
    return false;
  }
}
function validateAlphabet(alphabet) {
  const alphError = document.querySelector(".alph-error");
  if (alphabet.length < 3) {
    alphError.textContent = "Введите минимум 3 символа";
    alphError.style.color = "red";
    return false;
  } else if (alphabet.length > 10) {
    alphError.textContent = "В алфавите может находиться максимум 10 символов";
    alphError.style.color = "red";
    return false;
  } else {
    alphError.textContent = "";
    return true;
  }
}
function validateNameAlg(name) {
  const alphError = document.querySelector(".name-error");
  if (name.length < 3) {
    alphError.textContent = "Введите минимум 3 символа";
    alphError.style.color = "red";
    return false;
  } else if (name.length > 30) {
    alphError.textContent = "В названии может находиться максимум 30 символов";
    alphError.style.color = "red";
    return false;
  } else {
    alphError.textContent = "";
    return true;
  }
}
function checkAndHandleEmptyArrays(objectArrays) {
  const areAllNonEmpty = objectArrays.every((subArray) =>
    subArray.some((item) => typeof item === "string" && item.trim() !== "")
  );

  if (!areAllNonEmpty) {
    handleInputErrorEmptyTable();
    return false;
  }

  return true;
}
function checkTableNotEmpty(objectValues) {
  if (objectValues && Array.isArray(objectValues)) {
    return objectValues.some((array) => array.some((value) => value !== ""));
  }
  return false;
}

function isTapeNotEmpty() {
  const tapeSymbols = document.querySelectorAll(".tape-symbol");
  const symbolsArray = Array.from(tapeSymbols).map(
    (symbol) => symbol.textContent
  );
  if (symbolsArray.every((symbol) => symbol === "_")) {
    handleInputErrorEmptyTape();
    return false;
  }
  const uniqueSymbols = [...new Set(symbolsArray)];
  if (uniqueSymbols.length === 2 && uniqueSymbols.includes("_")) {
    handleInputErrorNotCorrectTape();
    return false;
  }

  return true; // Лента не пуста
}
function isSelectChoose(dropdowns) {
  let isValue = false;
  dropdowns.forEach((select) => {
    if (select.value !== "") {
      isValue = true;
    }
  });
  return isValue;
}

function checkIfNameExists(name) {
  const isRefactoringGlobal = localStorage.getItem("isRefactoringGlobal");
  const isImport = localStorage.getItem("isImporting");

  if (isRefactoringGlobal !== "true") {
    const namesOfBasicAlg =
      JSON.parse(localStorage.getItem("namesOfBasicAlg")) || [];
    if (!namesOfBasicAlg.includes(name) || namesOfBasicAlg == []) {
      return true;
    } else {
      if (isImport !== "true") {
        handleInputErrorAlgExists();
      }

      return false;
    }
  }
  return true;
}
