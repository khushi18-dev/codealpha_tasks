const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear
    if (value === "C") {
      expression = "";
      display.innerText = "0";
      return;
    }

    // Delete
    if (value === "⌫") {
      expression = expression.slice(0, -1);
      display.innerText = expression || "0";
      return;
    }

    // Equals
    if (value === "=") {
      try {
        expression = expression
          .replace(/×/g, "*")
          .replace(/÷/g, "/");
        expression = eval(expression).toString();
        display.innerText = expression;
      } catch {
        display.innerText = "Error";
        expression = "";
      }
      return;
    }

    // Prevent double operators
    const lastChar = expression.slice(-1);
    if ("+-*/".includes(lastChar) && "+−×÷".includes(value)) return;

    expression += value;
    display.innerText = expression;
  });
});

document.addEventListener("keydown", e => {
  if ("0123456789.+-*/".includes(e.key)) {
    expression += e.key;
    display.innerText = expression;
  }

  if (e.key === "Enter") {
    try {
      expression = eval(expression).toString();
      display.innerText = expression;
    } catch {
      display.innerText = "Error";
      expression = "";
    }
  }

  if (e.key === "Backspace") {
    expression = expression.slice(0, -1);
    display.innerText = expression || "0";
  }

  if (e.key === "Escape") {
    expression = "";
    display.innerText = "0";
  }
});
