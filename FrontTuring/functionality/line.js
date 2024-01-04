let middleIndex; // Индекс середины ленты
let tape; // Массив символов ленты
const symbolsToShow = 27; // Количество отображаемых символов
localStorage.removeItem("SymbolicLine");
localStorage.removeItem("NumericLine");
// Функция для создания ленты Машины Тьюринга
function createTapeSymbols() {
  const tapeSymbolsContainer = document.getElementById("tape-symbols");
  const tapeLength = 500; // Длина ленты
  middleIndex = Math.floor(tapeLength / 2); // Индекс середины ленты
  tape = Array.from({ length: tapeLength }, () => "_"); // Создаем массив с символами

  // Отображаем 27 символов из середины массива по умолчанию
  for (
    let i = middleIndex - Math.floor(symbolsToShow / 2);
    i < middleIndex + Math.ceil(symbolsToShow / 2);
    i++
  ) {
    const tapeSymbol = document.createElement("button");
    tapeSymbol.classList.add("tape-symbol");
    tapeSymbol.textContent = tape[i];

    if (i === middleIndex) {
      tapeSymbol.classList.add("center-symbol");
    }

    tapeSymbolsContainer.appendChild(tapeSymbol);

    tapeSymbol.addEventListener("click", function handleInput() {
      const radioButton = document.querySelector('input[value="symbolic"]');

      if (radioButton.checked) {
        // Очищаем символ, если он является "_"
        // if (tape[i] === "_") {
        //   tape[i] = "";
        //   tapeSymbol.textContent = "";
        // }
        tape[i] = "";
        tapeSymbol.textContent = "";
        // Проверяем, есть ли уже созданное поле ввода
        const existingInput = tapeSymbol.querySelector(".tape-input-field");
        if (!existingInput) {
          // Создаем поле для ввода символа
          const inputField = document.createElement("input");
          inputField.type = "text";
          inputField.maxLength = 1;
          inputField.size = 1; // Задаем размер поля равным 1 символу
          inputField.classList.add("tape-input-field");
          tapeSymbol.appendChild(inputField);

          // Установка фокуса на поле ввода
          inputField.focus();

          // Обработка ввода символа
          function handleSymbolInput(event) {
            const userInput = inputField.value;
            if (userInput.length === 1) {
              // Проверяем, есть ли символ в алфавите
              if (
                document
                  .getElementById("alphabet-input")
                  .value.includes(userInput)
              ) {
                tape[i] = userInput;
                tapeSymbol.removeChild(inputField);
                tapeSymbol.textContent = userInput;
              } else {
                checkSymbolsInAlphabet();
                tape[i] = "_";
                tapeSymbol.textContent = "_";
                // tapeSymbol.removeChild(inputField);
              }
            }
            localStorage.setItem("SymbolicLine", JSON.stringify(tape));
            // Удаляем обработчик события после завершения ввода
            //inputField.removeEventListener("input", handleSymbolInput);
            //tapeSymbol.removeEventListener("click", handleInput);
          }

          // Добавляем обработчик ввода символа
          inputField.addEventListener("input", handleSymbolInput);
        }
      }
    });
  }
}

function checkSymbolsInAlphabet() {
  const alphabet = document.getElementById("alphabet-input").value;
  const warningText = document.getElementById("warning");

  for (const symbol of tape) {
    if (symbol !== "_" || !alphabet.includes(symbol)) {
      warningText.textContent =
        "Возможно использование символов, которые включены в алфавит!";
      warningText.style.color = "orange";
      warningText.style.border = "1px solid orange";

      setTimeout(() => {
        warningText.textContent = "";
        warningText.style.border = "none";
      }, 3000); // 3 секунды задержки перед удалением текста предупреждения

      return;
    }
  }

  warningText.textContent = "";
}

// Функция для сдвига ленты вправо
function moveRight() {
  const tapeSymbolsContainer = document.getElementById("tape-symbols");
  tapeSymbolsContainer.innerHTML = ""; // Очищаем контейнер

  if (middleIndex + 1 < tape.length - Math.ceil(symbolsToShow / 2)) {
    middleIndex++;

    for (
      let i = middleIndex - Math.floor(symbolsToShow / 2);
      i < middleIndex + Math.ceil(symbolsToShow / 2);
      i++
    ) {
      const tapeSymbol = document.createElement("button");
      tapeSymbol.classList.add("tape-symbol");
      tapeSymbol.textContent = tape[i];

      if (i === middleIndex) {
        tapeSymbol.classList.add("center-symbol");
      }

      tapeSymbolsContainer.appendChild(tapeSymbol);

      tapeSymbol.addEventListener("click", function handleInput() {
        // Очищаем символ, если он является "_"
        if (tape[i] === "_") {
          tape[i] = "";
          tapeSymbol.textContent = "";
        }

        // Проверяем, есть ли уже созданное поле ввода
        const existingInput = tapeSymbol.querySelector(".tape-input-field");
        if (!existingInput) {
          // Создаем поле для ввода символа
          const inputField = document.createElement("input");
          inputField.type = "text";
          inputField.maxLength = 1;
          inputField.size = 1; // Задаем размер поля равным 1 символу
          inputField.classList.add("tape-input-field");
          tapeSymbol.appendChild(inputField);

          // Установка фокуса на поле ввода
          inputField.focus();

          // Обработка ввода символа
          function handleSymbolInput(event) {
            const userInput = inputField.value;
            if (userInput.length === 1) {
              // Проверяем, есть ли символ в алфавите
              if (
                document
                  .getElementById("alphabet-input")
                  .value.includes(userInput)
              ) {
                tape[i] = userInput;
                tapeSymbol.removeChild(inputField);
                tapeSymbol.textContent = userInput;
              } else {
                checkSymbolsInAlphabet();
                tape[i] = "_";
                tapeSymbol.textContent = "_";
                tapeSymbol.removeChild(inputField);
              }
            }
            // Удаляем обработчик события после завершения ввода
            inputField.removeEventListener("input", handleSymbolInput);
            tapeSymbol.removeEventListener("click", handleInput);
          }

          // Добавляем обработчик ввода символа
          inputField.addEventListener("input", handleSymbolInput);
        }
      });
    }
  }
}

// Функция для сдвига ленты влево
function moveLeft() {
  const tapeSymbolsContainer = document.getElementById("tape-symbols");
  tapeSymbolsContainer.innerHTML = ""; // Очищаем контейнер

  if (middleIndex - 1 >= Math.floor(symbolsToShow / 2)) {
    middleIndex--;

    for (
      let i = middleIndex - Math.floor(symbolsToShow / 2);
      i < middleIndex + Math.ceil(symbolsToShow / 2);
      i++
    ) {
      const tapeSymbol = document.createElement("button");
      tapeSymbol.classList.add("tape-symbol");
      tapeSymbol.textContent = tape[i];

      if (i === middleIndex) {
        tapeSymbol.classList.add("center-symbol");
      }

      tapeSymbolsContainer.appendChild(tapeSymbol);

      tapeSymbol.addEventListener("click", function handleInput() {
        // Очищаем символ, если он является "_"
        if (tape[i] === "_") {
          tape[i] = "";
          tapeSymbol.textContent = "";
        }

        // Проверяем, есть ли уже созданное поле ввода
        const existingInput = tapeSymbol.querySelector(".tape-input-field");
        if (!existingInput) {
          // Создаем поле для ввода символа
          const inputField = document.createElement("input");
          inputField.type = "text";
          inputField.maxLength = 1;
          inputField.size = 1; // Задаем размер поля равным 1 символу
          inputField.classList.add("tape-input-field");
          tapeSymbol.appendChild(inputField);

          // Установка фокуса на поле ввода
          inputField.focus();

          // Обработка ввода символа
          function handleSymbolInput(event) {
            const userInput = inputField.value;
            if (userInput.length === 1) {
              // Проверяем, есть ли символ в алфавите
              if (
                document
                  .getElementById("alphabet-input")
                  .value.includes(userInput)
              ) {
                tape[i] = userInput;
                tapeSymbol.removeChild(inputField);
                tapeSymbol.textContent = userInput;
              } else {
                tape[i] = "_";
                tapeSymbol.textContent = "_";
                checkSymbolsInAlphabet();
                tapeSymbol.removeChild(inputField);
              }
            }
            // Удаляем обработчик события после завершения ввода
            inputField.removeEventListener("input", handleSymbolInput);
            tapeSymbol.removeEventListener("click", handleInput);
          }

          // Добавляем обработчик ввода символа
          inputField.addEventListener("input", handleSymbolInput);
        }
      });
    }
  }
}

// Вызов функции при загрузке страницы
window.addEventListener("load", createTapeSymbols);

// Обработчики событий для кнопок вправо и влево
const moveRightButton = document.querySelector(".move-right");
const moveLeftButton = document.querySelector(".move-left");

moveRightButton.addEventListener("click", moveLeft);
moveLeftButton.addEventListener("click", moveRight);
