let calcButtons = document.querySelectorAll('.calcbutton');
let calcInput = document.querySelector('.calcinput');
let calcLog = document.querySelector('.calclog');

let add = (left, right) => left + right;
let subtract = (left, right) => left - right;
let divide = (left, right) => left / right;
let multiply = (left, right) => left * right;
let arithmeticOperations = {
    '+': add,
    '-': subtract,
    '/': divide,
    'x': multiply
};

let equals = () => {
    // TODO: equals button code
    return;
}
let dot = () => {
    // TODO: decimal point button code
    return;
}
let clear = () => {
    // TODO: clear button code
    return;
}
let calcFunctionButtons = {
    '=': equals,
    '.': dot,
    'C': clear,
}

let currentOperations = [];
let currentLeft = 0;
let currentRight = 0;
let currentOperator = '';

function operate(operator, left, right) {
    return arithmeticOperations[operator](Number(left), Number(right));
}

calcButtons.forEach((button, key, parent) => {
    // TODO: cant input the correct number if the result is in the way.
    // implement a function where a "display" number is there that disappears
    // with user input?
    if (button.textContent in arithmeticOperations) {

        button.addEventListener('click', event => {

            console.log(`${currentLeft}, ${currentRight}, ${currentOperator}`);

            if (currentLeft && currentOperator) {
                currentRight = calcInput.textContent;
                calcLog.textContent += `${currentRight} ${currentOperator}`;
                calcInput.textContent = operate(currentOperator, currentLeft, currentRight);
            }

            else {
                currentLeft = Number(calcInput.textContent);
                currentOperator = event.target.textContent;
                calcLog.textContent = `${currentLeft} ${currentOperator}`;
            }
            calcInput.textContent = '';

        });

    }

    else if (button.textContent in calcFunctionButtons) {
        button.addEventListener('click', event => {
        });
    }

    else {
        button.addEventListener('click', event => {
            calcInput.textContent += event.target.textContent;
        });
    }
});

class arithmeticOperation {
    constructor(operator, left, right) {
        this.left = left;
        this.right = right;
        this.operator = operator;
    }

    getResult() {
        return arithmeticOperations[this.operator](this.left, this.right);
    }

    toString() {
        return `${this.left} ${this.operator} ${this.right}`;
    }
}

let inputContainer = document.querySelector('.inputcontainer');
calcInput.style.right = calcInput.clientWidth - calcInput.offsetWidth + "px";