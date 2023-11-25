let calcButtons = document.querySelectorAll('.calcbutton');
let calcInput = document.querySelector('.calcinput');

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

let hadError = false;
let equals = event => {
    let operationHandler = new ChainOperationHandler(calcInput.textContent);
    if (!hadError) calcInput.textContent = operationHandler.result;
    hadError = false;
}

let clear = event => {
    calcInput.textContent = '';
}

let dot = event => {
    let nums = calcInput.textContent.split(/\+|-|\/|\x/);
    if (nums[nums.length - 1].indexOf('.') == -1)
        calcInput.textContent += event.target.textContent;
}

let backspace = event => {
    calcInput.textContent = calcInput.textContent.slice(0, -1);
}

let functionButtons = {
    '=': equals,
    'C': clear,
    '.': dot,
    'Back': backspace
}


function operate(operator, left, right) {
    return arithmeticOperations[operator](Number(left), Number(right));
}

function bugUser(text) {
    hadError = true;
    clear();
    alert(text);
}


calcButtons.forEach((button, key, parent) => {
    
    if (button.textContent in functionButtons) {
        button.addEventListener('click', functionButtons[button.textContent]);
    }

    else if (button.textContent in arithmeticOperations) {
        button.addEventListener('click', event => {
            let lastChar = calcInput.textContent.charAt(
                calcInput.textContent.length - 1
            );

            if (!(lastChar in arithmeticOperations) && 
            !(lastChar in functionButtons) &&
            calcInput.textContent != '')
                calcInput.textContent += button.textContent;
        });
    }

    else {
        button.addEventListener('click', event => {
            calcInput.textContent += event.target.textContent;
        });
    }

});


class ArithmeticOperation {

    constructor(operator, left, right) {
        this.left = Number(left);
        this.right = Number(right);
        this.operator = operator;

        if (Number.isNaN(left) || Number.isNaN(right) || Number.isNaN(this.getResult()))
            bugUser("Either something went wrong, or you made it go wrong.");
    }

    getResult() {
        return arithmeticOperations[this.operator](this.left, this.right);
    }

    toString() {
        return `${this.left} ${this.operator} ${this.right}`;
    }

}


class ChainOperationHandler {

    constructor(opString) {
        this.opString = opString;
        this.opSteps = [];
        this.opState = opString;
        this.result = this.getResult(opString);
    }

    getResult() {
        while (this.hasOperator(this.opState)) {
            let [opr, left, right] = this.parseLeftmostOperation(this.opState);
            this.solveSingleOperation(opr, left, right);
        }
        return this.opState;
    }

    hasOperator(opString) {
        return opString.split('').some(char => char in arithmeticOperations);
    }

    parseLeftmostOperation() {
        let arr = this.opState.split('');
        let left = '', right = '', operator = '';

        for (let i in arr) {
            if (right && arr[i] in arithmeticOperations) break;
            else if (arr[i] in arithmeticOperations) {
                operator = arr[i];
            }
            else if (operator) {
                right += arr[i];
            }
            else {
                left += arr[i];
            }
        }

        return [operator, left, right];
    }

    solveSingleOperation(operator, left, right) {
        let curOp = new ArithmeticOperation(operator, left, right);
        this.opState = this.opState.replace(
            `${left}${operator}${right}`, 
            curOp.getResult().toString()
        );
        this.opSteps.push({ operation: curOp, state: this.opState });
    }

}