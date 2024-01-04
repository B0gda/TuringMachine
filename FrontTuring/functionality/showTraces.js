//localStorage.setItem("currentStatusTrace", "6");

function createTapeForm(traces) {
  const MAX_TRACES_TO_DISPLAY = 500;
  const tapeList = document.querySelector(".tape-list-next");
  tapeList.innerHTML = "";
  const currentStatusTrace = localStorage.getItem("currentStatusTrace");
  let startTraceIndex = 0;
  if (
    currentStatusTrace &&
    Number(currentStatusTrace) >= MAX_TRACES_TO_DISPLAY
  ) {
    startTraceIndex = Number(currentStatusTrace) - (MAX_TRACES_TO_DISPLAY - 1);
  }
  const tracesToDisplay = traces.slice(
    startTraceIndex,
    startTraceIndex + MAX_TRACES_TO_DISPLAY
  );
  tracesToDisplay.forEach((trace, index) => {
    const indexedTrace = document.createElement("div");
    indexedTrace.textContent = `${startTraceIndex + index}.`;
    indexedTrace.classList.add("indexed-trace-next");

    const tape = document.createElement("div");
    tape.classList.add("tape-next");
    tape.innerHTML = `<div class="symbols-next">${trace
      .split("")
      .map((symbol, index) =>
        index === 13
          ? `<button class="center-symbol">${symbol}</button>`
          : `<button class="">${symbol}</button>`
      )
      .join("")}</div>`;
    const tapeContainer = document.createElement("div");
    tapeContainer.classList.add("tape-container-next");
    tapeContainer.appendChild(indexedTrace);
    tapeContainer.appendChild(tape);
    tapeList.appendChild(tapeContainer);
    if (
      currentStatusTrace &&
      Number(currentStatusTrace) === startTraceIndex + index + 1
    ) {
      tapeContainer.style.backgroundColor = "#d9e94c";
    }
  });
}

// Для открытия формы по нажатию на кнопку
const lookTraceButton = document.querySelector(".look-trace");
const turingMachine = document.querySelector(".turing-machine-next");
const closeButton = document.querySelector(".close-button-next");

lookTraceButton.addEventListener("click", () => {
  const currentStatusTrace = localStorage.getItem("currentStatusTrace");

  if (currentStatusTrace < 0 || currentStatusTrace === null) {
    const errorText = document.querySelector(".error-form__text");
    errorText.textContent = "Не произведен запуск алгоритма";
    showErrorForm();
  } else {
    turingMachine.classList.remove("hidden");
    const traces = JSON.parse(localStorage.getItem("traces"));
    createTapeForm(traces);
  }
});

window.addEventListener("storage", function (event) {
  if (event.key === "currentStatusTrace") {
    const currentStatusTrace = localStorage.getItem("currentStatusTrace");

    if (currentStatusTrace < 0 || currentStatusTrace === null) {
      const errorText = document.querySelector(".error-form__text");
      errorText.textContent = "Не произведен запуск алгоритма";
      showErrorForm();
    } else {
      turingMachine.classList.remove("hidden");
      const traces = JSON.parse(localStorage.getItem("traces"));
      createTapeForm(traces);
    }
  }
});

closeButton.addEventListener("click", () => {
  turingMachine.classList.add("hidden");
});
