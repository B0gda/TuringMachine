const isSuccess = JSON.parse(localStorage.getItem("isSuccess"));
// console.log(isSuccess);
if (isSuccess) {
  const errorText = document.querySelector(".success-form__text");
  errorText.textContent = "Алгоритм сохранен успешно!";
  showSuccessForm();
} else if (isSuccess == null) {
} else if (!isSuccess) {
  const errorText = document.querySelector(".error-form__text");
  errorText.textContent = "Что-то пошло не так";
  showErrorForm();
}
localStorage.removeItem("isSuccess");
