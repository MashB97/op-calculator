let firstValue = "";
let secondValue = "";
let result = "";
let operator = "";
let isDecimal = false;

document.addEventListener("DOMContentLoaded", () => {
    let numbers = document.querySelectorAll(".cal-num");
    let operators = document.querySelectorAll(".cal-operator");
    let calCanc = document.querySelector(".cal-canc");
    let calPercentage = document.querySelector("#cal-percentage");
    let calDot = document.querySelector("#cal-dot");
    let calSignal = document.querySelector("#cal-signal");
    let calDisplay = document.querySelector(".cal-display");
    let calResult = document.querySelector(".cal-result");
    let calBackSpace = document.querySelector("#cal-backspace");
    let msgPara = document.querySelector(".msg-para");

    calDisplay.textContent = "0";
    // Listen for keyboard events and handle input for the calculator.
    document.addEventListener("keydown", (e) => {
        let numHover;
        //If numTimeout is call removes the 'btn-num' class from numHover after 250ms for number buttons
        const numTimeout = () => {
            setTimeout(() => {
                numHover.classList.remove('btn-num');   
        }, 250);};
        //If numTimeout is call removes the 'btn-num' class from numHover after 500ms for number buttons
        const BtnTimeout = () => {
            setTimeout(() => {
                numHover.classList.remove('btn-num');
            }, 500);
        };
        // Handles keydown events for calculator input:
        // - For numeric keys (0-9) and adds 'btn-num' class to corresponding number button for an hover effect and removes it with numTimeout.
        // - For operator keys (+, -, *, /), adds 'btn-num' class to corresponding operator button for an hover effect  and removes it with BtnTimeout.
        // - For '.' key, adds 'btn-num' class to the dot button for an hover effect  and removes it with BtnTimeout.
        // - For 'Enter' key, adds 'btn-num' class to the result button for an hover effect  and removes it with BtnTimeout.
        // - For 'Backspace' key, adds 'btn-num' class to the backspace button for an hover effect  and removes it with BtnTimeout.
        // - For 'Delete' key, adds 'btn-num' class to the clear button for an hover effect  and removes it with BtnTimeout.
        if (e.key >= '0' && e.key <= '9') {
            getNumberInput(e.key);
            numHover = document.querySelector(`#cal-${e.key}`);
            numHover.classList.add('btn-num');
            numTimeout();
        } else if (e.key === '+') {
            showResult();
            operator = e.key;
            numHover = document.querySelector("#cal-add");
            numHover.classList.add('btn-num');
            BtnTimeout();
        } else if (e.key === '-') {
            showResult();
            operator = e.key;
            numHover = document.querySelector("#cal-sub");
            numHover.classList.add('btn-num');
            BtnTimeout();
        } else if (e.key === '*') {
            showResult();
            operator = 'x';
            numHover = document.querySelector("#cal-multiply");
            numHover.classList.add('btn-num');
            BtnTimeout();
        } else if (e.key === '/') {
            showResult();
            operator = e.key;
            numHover = document.querySelector("#cal-div");
            numHover.classList.add('btn-num');
            BtnTimeout();
        } else if (e.key === '.') {
            checkDot();
            numHover = document.querySelector("#cal-dot");
            numHover.classList.add('btn-num');
            BtnTimeout();
        } else if (e.key === 'Enter') {
            showResult();
            numHover = document.querySelector("#cal-result");
            numHover.classList.add('btn-num');
            BtnTimeout();
        } else if (e.key === 'Backspace') {
            handleBackspace();
            numHover = document.querySelector("#cal-backspace");
            numHover.classList.add('btn-num');
            BtnTimeout(); 
        } else if (e.key === 'Delete') {
            clearContent();
            numHover = document.querySelector("#cal-canc");
            numHover.classList.add('btn-num');
            BtnTimeout();
        }
    });
    // This function updates the secondValue with the provided number, and check the input length:
    // - Allows up to 5 digits before the decimal point and up to 3 digits after the decimal point.
    // - Updates the calculator display and clears any error message if the input is valid.
    // - Displays an error message if the input exceeds the specified limits.
    const getNumberInput = (num) => {
        if ((secondValue.split('.')[0].length < 5 && !secondValue.includes('.')) || 
            (secondValue.includes('.') && secondValue.split('.')[1].length < 3)) {
            secondValue += num;
            calDisplay.textContent = secondValue;
            msgPara.textContent = "";
        } else {
            msgPara.textContent = "You can enter a maximum of 5 digits before, or 3 digits after the decimal point.";
        }
    };
    // This function adds a decimal point to secondValue if it doesn't already have one:
    // - If secondValue is empty, initializes it with 0 before adding the decimal point.
    // - Updates the calculator display with the new value and sets isDecimal to true to prevent multiple decimal points.
    const checkDot = () => {
        if (!isDecimal) {
            if (secondValue === "") {
                secondValue = "0";
            } else {
            secondValue += ".";
            calDisplay.textContent = secondValue;
            isDecimal = true;
        }
    }
    };
    // Calculates and displays the result based on the current values and operator:
    // - If firstValue is empty, sets it to secondValue and clears secondValue.
    // - If both firstValue and secondValue are present, performs the calculation using operate function,
    //      updates the display with the result, and sets firstValue to the result for further operations.
    // - Clears secondValue and operator for the next input.
    const showResult = () => {
        msgPara.textContent = "";
        if (firstValue === "") {
            firstValue = secondValue;
            secondValue = "";
        } else if (firstValue && secondValue) {
            result = operate(firstValue, secondValue, operator);
            calDisplay.textContent = result;
            firstValue = result;
            secondValue = "";
            operator = "";
        }
    };
    // This function handles backspace functionality:
    // - If there is a result from a previous calculation, sets secondValue to that result and clears result.
    // - Removes the last character from secondValue if it is not empty, and updates the display.
    // - If secondValue is empty but operator is set, clears the operator.
    // - If both secondValue and operator are empty but firstValue is present, removes the last character and updates the display.
    // - Sets isDecimal to true if either secondValue or firstValue contains a decimal point.
    const handleBackspace = () => {
        msgPara.textContent = "";
        if (result !== "") {
            secondValue = result;
            result = "";
        }    
        if (secondValue !== "") {
            if (secondValue.split('.')) {
                secondValue = secondValue.slice(0, -1);
            } else {
                secondValue = secondValue.slice(0, -1);
            }
            if (secondValue === "") {
                calDisplay.textContent = "0";
            } else {
                calDisplay.textContent = secondValue;
            }
        } else if (operator !== "") {
            operator = "";
        } else if (firstValue !== "") {
            if (firstValue.split('.')) {
                firstValue = firstValue.slice(0, -1);
            } else {
                firstValue = firstValue.slice(0, -1);
            }
            if (firstValue === "") {
                calDisplay.textContent = "0";
            } else {
                calDisplay.textContent = firstValue;
            }
        }
        isDecimal = secondValue.includes('.') || firstValue.includes('.');
    };
    const clearContent = () => {
        calDisplay.textContent = "0";
        firstValue = "";
        secondValue = "";
        result = "";
        operator = "";
        isDecimal = false;
        msgPara.textContent = "";
    };
    // Adds event listeners to calculator buttons:
    // - For number buttons, calls getNumberInput() with the button's text content when clicked.
    // - For operator buttons, sets the operator variable and calls showResult() when clicked.
    // - For the sign button, toggles the sign of secondValue, updates the display, and converts secondValue to a string.
    // - For the percentage button, divides secondValue by 100, updates the display, and converts secondValue to a string.
    // - For the decimal point button, calls checkDot() to add a decimal point if needed.
    // - For the result button, calls showResult() with the current operator to calculate and display the result.
    // - For the backspace button, calls handleBackspace() to remove the last character from secondValue or firstValue.
    // - For the clear button, calls clearContent() to reset the calculator.
    numbers.forEach(num => num.addEventListener("click", (e) => getNumberInput(e.target.textContent)));
    operators.forEach(op => op.addEventListener("click", (e) => {
        operator = e.target.textContent;
        showResult()}));
    calSignal.addEventListener("click", () => {
        secondValue = -secondValue;
        calDisplay.textContent = secondValue;
        secondValue = secondValue.toString();
    });
    calPercentage.addEventListener("click", () => {
        secondValue = (Number(secondValue)/100).toString();
        calDisplay.textContent = secondValue;
    });
    calDot.addEventListener("click", checkDot);
    calResult.addEventListener("click", () => showResult(operator));
    calBackSpace.addEventListener("click", handleBackspace);
    calCanc.addEventListener("click", clearContent);
    // Defines mathematical operations and the main calculation function:
    // - addCal(Adds two numbers), subCal(Subtracts the second number from the first number), mulCal(Multiplies two numbers),
    //   divCal(divides the first number by the second number, with error handling for division by zero).
    // - If dividing by zero, displays an error message and resets the calculator state, 
    //   otherwise, performs the division and returns the result, rounded to 3 decimal places.
    // - The operate function takes two numbers and an operator, performs the corresponding operation, and returns the result.
    //   - Uses the appropriate function based on the operator ('+', '-', 'x', '/').

    const addCal = (num1, num2) => num1 + num2;
    const subCal = (num1, num2) => num1 - num2;
    const mulCal = (num1, num2) => num1 * num2;
    const divCal = (num1, num2) => {
        if (secondValue === "0" && operator === "/") {
            msgPara.textContent = "It's not possible to divide by 0 Start a new operation";
            calDisplay.textContent = "";
            firstValue = "";
            secondValue = "";
            operator = "";
            isDecimal = false;
        } else {
            result = Number((num1 / num2).toFixed(3));
            return result.toString();
        }
    
    };
    const operate = (firsT, seconD, oP) => {
        firsT = Number(firsT);
        seconD = Number(seconD);
        if (oP === "+") {
            return addCal(firsT, seconD);
        } else if (oP === "-") {
            return subCal(firsT, seconD);
        } else if (oP === "x") {
            return mulCal(firsT, seconD);
        } else if (oP === "/") {
            return divCal(firsT, seconD);
        }
        console.log(firstValue);
        console.log(secondValue);
        console.log(oP);
        console.log(operator);
        console.log(result);
    }
});
