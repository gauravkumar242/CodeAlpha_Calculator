// Display elements

const display =
    document.getElementById("display");

const previous =
    document.getElementById("previous");


// Current calculation

let currentValue = "";


// --------------------------------------------------
// Add number or operator
// --------------------------------------------------

function appendValue(value) {

    currentValue += value;

    display.innerText = currentValue;

}


// --------------------------------------------------
// Clear calculator
// --------------------------------------------------

function clearDisplay() {

    currentValue = "";

    display.innerText = "0";

    previous.innerText = "";

}


// --------------------------------------------------
// Delete last character
// --------------------------------------------------

function deleteLast() {

    currentValue =
        currentValue.slice(0, -1);


    if (currentValue === "") {

        display.innerText = "0";

    }

    else {

        display.innerText =
            currentValue;

    }

}


// --------------------------------------------------
// Calculate result
// --------------------------------------------------

function calculate() {

    if (currentValue === "") {

        return;

    }


    try {

        // Show calculation above result

        previous.innerText =
            currentValue + " =";


        // Convert percentage

        let expression =
            currentValue.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        // Calculate

        let result =
            eval(expression);


        // Check invalid result

        if (
            result === Infinity ||
            result === -Infinity ||
            Number.isNaN(result)
        ) {

            throw new Error();

        }


        // Limit decimal places

        result =
            Number(result.toFixed(10));


        // Show result

        display.innerText =
            result;


        // Store result

        currentValue =
            result.toString();

    }

    catch {

        display.innerText =
            "Error";

        currentValue = "";

    }

}


// --------------------------------------------------
// Keyboard Support
// --------------------------------------------------

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendValue(key);

        }


        // Operators

        else if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%" ||
            key === "."
        ) {

            appendValue(key);

        }


        // Enter = Calculate

        else if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        // Backspace = Delete

        else if (
            key === "Backspace"
        ) {

            deleteLast();

        }


        // Escape = Clear

        else if (
            key === "Escape"
        ) {

            clearDisplay();

        }

    }
);