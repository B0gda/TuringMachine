const executionMode = document.getElementById("execution-mode");
const executionSpeed = document.getElementById("execution-speed");

executionMode.addEventListener("change", function () {
  if (
    executionMode.value === "step-by-step" ||
    executionMode.value === "auto"
  ) {
    executionSpeed.disabled = true;
    executionSpeed.selectedIndex = 0;
  } else {
    executionSpeed.disabled = false;
  }
});

function areListsSelected() {
  const executionMode = document.getElementById("execution-mode");
  const executionSpeed = document.getElementById("execution-speed");
  function changeHandlerExecutionMode() {
    if (executionMode.value !== "") {
      executionMode.style.borderColor = "";
      executionMode.removeEventListener("change", changeHandlerExecutionMode);
    }
  }
  if (executionMode.value === "") {
    executionMode.style.borderWidth = "2px";
    executionMode.style.borderColor = "red";
    executionMode.addEventListener("change", changeHandlerExecutionMode);
    handleInputErrorExecutionMode();
    return false;
  } else {
    executionMode.style.borderColor = "";
  }

  function changeHandlerExecutionSpeed() {
    if (executionMode.value === "auto-delay" && executionSpeed.value !== "") {
      executionSpeed.style.borderColor = "";
      executionSpeed.removeEventListener("change", changeHandlerExecutionSpeed);
    }
  }

  if (executionMode.value === "auto-delay" && executionSpeed.value === "") {
    executionSpeed.style.borderWidth = "2px";
    executionSpeed.style.borderColor = "red";
    executionSpeed.addEventListener("change", changeHandlerExecutionSpeed);
    handleInputErrorExecutionSpeed();
    return false;
  } else {
    executionSpeed.style.borderColor = "";
  }

  return true;
}

// Установка начальных значений по умолчанию
executionMode.selectedIndex = 0;
executionSpeed.selectedIndex = 0;
