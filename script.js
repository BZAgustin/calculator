// Global variables
let firstOperand = undefined;
let lastOperand = undefined;
let operator = '';
let lastOperator = '';
let opIsPressed = false;

// Target display and buttons
const display = document.querySelector('.screen');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const other = Array.from(document.querySelectorAll('.other'));
const result = document.querySelector('.result');

// 'Number' buttons event listeners
numbers.forEach(btn => {
    btn.addEventListener('click', e => {
        if(operator && opIsPressed) {
            display.textContent = '';
            drawNumber(e);
            opIsPressed = false;
        } else {
            drawNumber(e);
        } 
    });
});

// 'Other' buttons event listeners
other.forEach(btn => {
    btn.addEventListener('click', e => {
        let id = e.target.id;
        
        // Select which action to perform based on the button pressed
        if(id === 'AC') {
            clearValues();
            display.textContent = '0';
        } else if(id === 'C') {
            if(Array.from(display.textContent).length < 2) {
                display.textContent = '0';
            } else if(display.textContent != '0') {
                display.textContent = deleteLastDigit(display.textContent);
            } else return;
        } else if(id === 'posneg') {
            if(display.textContent != '0') {
                display.textContent = changeSign(display.textContent);
            } else return;
        } else if(id === 'decimal') {
            display.textContent = toFloat(display.textContent);
        }
    });
});

// 'Operator' buttons event listeners
operators.forEach(btn => {
    btn.addEventListener('click', e => {
        let id = e.target.id;
        
        // Runs when there is already an existing operation
        if(lastOperator) {
            console.log('Operator is defined');
            // Check whether the operation button is being pressed twice
            if(opIsPressed) {
                console.log('No last operand. Returning');
                return;
            } else if(firstOperand && lastOperand){
                if(lastOperand == 0 && operator == '/') {
                    display.textContent == "ERROR";
                    return;
                } else {
                    console.log('Operation and last operand found. Displaying solved operation');
                    lastOperand = display.textContent;
                    display.textContent = solveOperation(operator, firstOperand, lastOperand);
                    firstOperand = display.textContent;
                }
            }
        }
        
        if(id === 'add') {
            console.log('Current operator: plus');
            operator = '+';
            display.textContent += ' +';
        } else if(id === 'substract') {
            console.log('Current operator: minus');
            operator = '-';
            display.textContent += ' -';
        } else if(id === 'multiply') {
            console.log('Current operator: times');
            operator = '*';
            display.textContent += ' *';
        } else {
            console.log('Current operator: by');
            operator = '/';
            display.textContent += ' /';
        } 
        
        if(display.textContent != '0') {
            if(firstOperand === undefined) {
                console.log('No first operand found. Saving display as 1st operand');
                firstOperand = display.textContent;
                opIsPressed = true;
            } else {
                console.log('First operand found. Saving display as 2nd operand and solving operation');
                lastOperand = display.textContent;
                display.textContent = solveOperation(operator, firstOperand, lastOperand);
                firstOperand = display.textContent;
                opIsPressed = true;
                }
        } else return;
        
    });
})

result.addEventListener('click', e => {
    if(firstOperand && display.textContent && operator && !opIsPressed) {
        if(lastOperand == 0 && operator == '/') {
            display.textContent == "ERROR";
            return;
        } else {
            lastOperand = display.textContent;
            display.textContent = solveOperation(operator, firstOperand, lastOperand);
            firstOperand = display.textContent;
            clearValues();
            lastOperator = '';
            operator = '';
        }
    }   else return;
});

// Draw number on screen
function drawNumber(e) {
    if(display.textContent === '0') {
        if(e.target.id === 'zero') {
            return;
        } else {
            display.textContent = e.target.innerHTML;
        }
    } else {
        display.textContent += e.target.innerHTML;
    }
}

// Basic operations
function add(a, b) {
    return a+b;
}

function substract(a, b) {
    return a-b;
}

function divide(a, b) {
    return a/b;
}

function multiply(a, b) {
    return a*b;
}

// Operator function
function solveOperation(operator, x, y) {
    // Check whether the number to evaluate will be an int or a float
    if(isFloat(x) && isFloat(y)) {
        x = parseFloat(x);
        y = parseFloat(y);
    } else if(isFloat(x)) {
        x = parseFloat(x);
        y = parseInt(y);
    } else if(isFloat(y)) {
        x = parseInt(x);
        y = parseFloat(y);
    } else {
        x = parseInt(x);
        y = parseInt(y);
    }

    console.log(`First operand: ${x}`);
    console.log(`Second operand: ${y}`);
    
    if(operator === '+') {
        lastOperator = operator;
        operator = '';
        clearValues();
        return add(x, y);
    } else if(operator === '-') {
        lastOperator = operator;
        operator = '';
        clearValues();
        return substract(x, y);
    } else if (operator === '/') {
        lastOperator = operator;
        operator = '';
        clearValues();
        return divide(x, y);
    } else {
        lastOperator = operator;
        operator = '';
        clearValues();
        return multiply(x, y);
    }
}

// Clear all values
function clearValues() {
    firstOperand = undefined;
    lastOperand = undefined;
}

// Remove last digit
function deleteLastDigit(str) {
    if(opIsPressed) {
        opIsPressed = false;
        operator = '';
    }

    let arr = Array.from(str);
    arr.pop();
    str = arr.join("");
    return str;
}

// Change to opposite sign
function changeSign(val) {  
  if(val > 0) {
      return -Math.abs(val);
  } else if(val < 0) {
      return Math.abs(val);
  } else return val;
}

// Change to float
function toFloat(str) {
    if(!isFloat(str)) {
        return str + '.';
    } else {
        return str;
    }
}

// Evaluate float
function isFloat(val) {
    return Array.from(val).some(element => element === '.');
}