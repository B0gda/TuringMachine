// Отображение формы ошибки
function showErrorForm() {
  const errorForm = document.querySelector(".error-form");
  errorForm.classList.remove("hidden");
  setTimeout(() => {
    errorForm.classList.add("hidden");
  }, 3000);
}

// Отображение формы успешного сохранения
function showSuccessForm() {
  const successForm = document.querySelector(".success-form");
  successForm.classList.remove("hidden");
  setTimeout(() => {
    successForm.classList.add("hidden");
  }, 3000);
}

// Функция обработки ошибки
function handleInputError() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Не все ячейки таблицы заполнены корректно";
  showErrorForm();
}
function handleInputErrorHALT() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "В таблице должно быть одно состояние HALT";
  showErrorForm();
}
function handleInputErrorEmptyTable() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent =
    "Нельзя загрузить алгоритм в систему, пока каждому символу не добавлено как минимум одно состояние";
  showErrorForm();
}
function handleInputErrorAlphabet() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent =
    "Не удается запустить алгоритм из-за неправильно сконструированного алфавита.";
  showErrorForm();
}
function handleInputErrorEmptyTape() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Не удается запустить алгоритм, пока лента пуста.";
  showErrorForm();
}
function handleInputErrorNotCorrectTape() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent =
    "Данные на ленте введены некорректно. Требуется ввод как минимум трех различных типов символов.";
  showErrorForm();
}
function handleInputErrorExecutionMode() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Пожалуйста, укажите режим исполнения алгоритма.";
  showErrorForm();
}
function handleInputErrorExecutionSpeed() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Пожалуйста, укажите скорость исполнения алгоритма.";
  showErrorForm();
}
function handleInputErrorNotLoadAlg() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent =
    "Приносим свои глубочайшие изменения, но? перед запуском? алгоритм необходимо предварительно загрузить в систему.";
  showErrorForm();
}
function handleInputErrorAlgExists() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Алгоритм с таким названием уже существует в системе";
  showErrorForm();
}

function handleInputErrorNotChoosePersonalAlg() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Не выбран ни один пользовательский алгоритм";
  showErrorForm();
}
function handleInputErrorChooseBasicAlg() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent =
    "Выбран базовый алгоритм, который нельзя изменить. Пожалуйста, выберите алгоритм из списка пользовательских";
  showErrorForm();
}
function handleInputErrorNoSuchFile() {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Файл не найден или доступ к нему ограничен";
  showErrorForm();
}
