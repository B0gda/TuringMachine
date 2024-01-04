document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelector(".save-button") || null;
  const isRefactoringGlobal = localStorage.getItem("isRefactoringGlobal");

  if (isRefactoringGlobal !== null) {
    const selectedTextToRefactor = localStorage.getItem(
      "selectedTextToRefactor"
    );

    const nameInput = document.getElementById("name-input");
    nameInput.value = selectedTextToRefactor;
  }

  saveButton.addEventListener("click", function () {
    alphabetAddColumnToLocalStorage();
    const alphabetInput = document.getElementById("alphabet-input").value;
    const nameAlgInput = document.getElementById("name-input").value;
    const isAlphNotEmpty = validateAlphabet(alphabetInput);
    const isNameNotEmpty = validateNameAlg(nameAlgInput);
    if (isAlphNotEmpty && isNameNotEmpty) {
      const tableRows = document.querySelectorAll(
        ".statetable tbody tr:not(:first-child)"
      );
      const rowsArray = Array.from(tableRows);
      rowsArray.shift();
      const statesHeaders = document.querySelectorAll(
        '.statetable th[colspan="3"]'
      );
      const objectValues = JSON.parse(localStorage.getItem("objectsArray"));
      if (
        checkOneHalt() &&
        checkEveryRowCorrect(rowsArray, objectValues) &&
        checkAndHandleEmptyArrays(objectValues) &&
        checkIfNameExists(nameAlgInput)
      ) {
        const jsonData = {
          name: nameAlgInput,
          basic: false,
          alphabet: alphabetInput,
          symbols: [],
        };

        const statesCount = statesHeaders.length;

        tableRows.forEach((row) => {
          const tapeSymbol = row.children[0].innerText.trim();

          const symbolObj = {
            symbol: tapeSymbol,
            states: {},
          };

          for (let i = 1; i <= statesCount * 3; i += 3) {
            const moveTapeSelect = row.children[i].querySelector("select");
            const nextStateSelect = row.children[i + 1].querySelector("select");
            const writeSymbolSelect =
              row.children[i + 2].querySelector("select");

            const moveTape = moveTapeSelect ? moveTapeSelect.value : "";
            const nextState = nextStateSelect ? nextStateSelect.value : "";
            const writeSymbol = writeSymbolSelect
              ? writeSymbolSelect.value
              : "";

            // Проверка наличия заголовков состояний перед использованием
            if (statesHeaders[Math.floor((i - 1) / 3)]) {
              stateKey =
                statesHeaders[Math.floor((i - 1) / 3)].innerText.trim();
            } else {
              // Если заголовок не найден, создайте его в формате "Q<номер>"
              stateKey = `Q${Math.floor((i - 1) / 3)}`;
            }

            if (
              stateKey !== "" &&
              moveTape !== "" &&
              nextState !== "" &&
              writeSymbol !== ""
            ) {
              const stateObj = {
                nextState: nextState,
                symbol: moveTape,
                moveCaretOption: writeSymbol,
              };

              symbolObj.states[stateKey] = stateObj;
            }
          }

          jsonData.symbols.push(symbolObj);
        });
        // Удаление первого объекта из массива symbols
        if (jsonData && jsonData.symbols && jsonData.symbols.length > 0) {
          jsonData.symbols.shift(); // Этот метод удаляет первый элемент массива
        }
        const jsonOutput = JSON.stringify(jsonData, null, 2);

        console.log(jsonOutput);
        const isRefactoringGlobal = localStorage.getItem("isRefactoringGlobal");

        if (isRefactoringGlobal !== null) {
          const selectedIdToRefactor = localStorage.getItem(
            "selectedIdToRefactor"
          );
          console.log(selectedIdToRefactor);
          fetch(`http://localhost:8100/algorythm/${selectedIdToRefactor}`, {
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
                window.location.href = "./index.html";
              } else {
                const errorText = document.querySelector(".error-form__text");
                errorText.textContent = `Ошибка при выполнении запроса: ${response.statusText}`;
                showErrorForm();
              }
            })
            .catch((error) => {
              const errorText = document.querySelector(".error-form__text");
              errorText.textContent = `Ошибка при выполнении запроса: ${response.statusText}`;
              showErrorForm();
            });
        } else {
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
                window.location.href = "./index.html";
              } else {
                const errorText = document.querySelector(".error-form__text");
                errorText.textContent = `Ошибка при выполнении запроса: ${response.statusText}`;
                showErrorForm();
              }
            })
            .catch((error) => {
              const errorText = document.querySelector(".error-form__text");
              errorText.textContent = `Ошибка при выполнении запроса: ${error}`;
              showErrorForm();
            });
        }
      }
    }
  });
  // Функция для генерации имени
  // function generateName() {
  //   const currentDate = new Date();
  //   const formattedDate = `${currentDate.getDate()}.${
  //     currentDate.getMonth() + 1
  //   }.${currentDate.getFullYear()} - ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  //   return `П_А_${formattedDate}`;
  // }
});
const nameInputElement = document.getElementById("name-input");

nameInputElement.addEventListener("input", function () {
  const nameAlgValue = this.value;
  const isAlphNotEmpty = validateNameAlg(nameAlgValue);
});
