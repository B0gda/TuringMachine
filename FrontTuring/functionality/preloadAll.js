async function fillDropdowns() {
  try {
    const response = await fetch("http://localhost:8100/algorythm", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = document.querySelector(".error-form__text");
      errorText.textContent = "Ошибка при получении данных";
      showErrorForm();
    }

    const data = await response.json();
    //console.log(data);
    const namesOfBasicFalse = data
      .filter((item) => !item.basic) // Отфильтровать объекты, где basic равен false
      .map((item) => item.name);
    localStorage.setItem("namesOfBasicAlg", JSON.stringify(namesOfBasicFalse));
    const basicDropdown = document.querySelector(
      ".dropdown select:first-of-type"
    );
    const customDropdown = document.querySelector(
      ".dropdown:last-of-type select"
    );

    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.text = item.name;

      if (item.basic) {
        basicDropdown.appendChild(option);
      } else {
        customDropdown.appendChild(option);
      }
    });
  } catch (error) {
    const errorText = document.querySelector(".error-form__text");
    errorText.textContent = "Ошибка при получении данных";
    showErrorForm(); //400-404
  }
}

fillDropdowns();
