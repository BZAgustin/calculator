// Global variables
let firstOperand = undefined;
let lastOperand = undefined;
let operator = '';
let lastOperator = '';
let opIsPressed = false;
let lockOn = false;

// Target display and buttons
const display = document.querySelector('.screen');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const other = Array.from(document.querySelectorAll('.other'));
const result = document.querySelector('.result');

// 'Number' buttons event listeners
numbers.forEach(btn => {
    btn.addEventListener('click', e => {
        if(lockOn) {
            return;
        }

        if(operator && opIsPressed) {
            display.textContent = '';
            drawNumber(e);
            opIsPressed = false;
        } else {
            if(hasProperLength(display.textContent)) {
                drawNumber(e);
            } else return;
        } 
    });
});

// 'Other' buttons event listeners
other.forEach(btn => {
    btn.addEventListener('click', e => {
        let id = e.target.id;
        
        // Select which action to perform based on the button pressed
        if(id === 'AC') {
            if(lockOn) {
                lockOn = false;
            }
            clearValues();
            display.textContent = '0';
        } else if(id === 'C') {
            if(lockOn) {
                display.textContent = '0';
                clearValues();
                lockOn = false;
            }
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
            if(lockOn) {
                return;
            }

            if(hasProperLength(display.textContent)) {
                display.textContent = toFloat(display.textContent);
            } else return;
        }
    });
});

// 'Operator' buttons event listeners
operators.forEach(btn => {
    btn.addEventListener('click', e => {
        let id = e.target.id;

        if(lockOn) {
            return;
        }

        if(operator && firstOperand && !opIsPressed) {
            lastOperand = display.textContent;
            display.textContent = solveOperation(operator, firstOperand, lastOperand);
            display.textContent = formatDisplay(display.textContent);
            firstOperand = display.textContent;
        }

        if(!opIsPressed) {
            if(hasProperLength(display.textContent)) {
                if(id === 'add') {
                    operator = '+';
                    display.textContent += '+';
                    opIsPressed = true;
                } else if(id === 'substract') {
                    operator = '-';
                    display.textContent += '-';
                    opIsPressed = true;
                } else if(id === 'multiply') {
                    operator = '*';
                    display.textContent += '*';
                    opIsPressed = true;
                } else {
                    operator = '/';
                    display.textContent += '/';
                    opIsPressed = true;
                } 
            } else return;        
        } else return;
        
        if(operator && !firstOperand) {
            if(firstOperand === undefined) {
                firstOperand = display.textContent;
                opIsPressed = true;
            } else {
                lastOperand = display.textContent;
                display.textContent = solveOperation(operator, firstOperand, lastOperand);
                display.textContent = formatDisplay(display.textContent);
                firstOperand = display.textContent;
                opIsPressed = true;
                }
        } else return; 
    });
});

result.addEventListener('click', e => {
    if(firstOperand && display.textContent && operator && !opIsPressed && !lockOn) {
            lastOperand = display.textContent;
            display.textContent = solveOperation(operator, firstOperand, lastOperand);
            display.textContent = formatDisplay(display.textContent);
            firstOperand = display.textContent;
            clearValues();
            lastOperator = '';
            operator = '';
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
};

// Basic operations
function add(a, b) {
    return a+b;
};

function substract(a, b) {
    return a-b;
};

function divide(a, b) {
    return a/b;
};

function multiply(a, b) {
    return a*b;
};

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
        if(y == 0) {
            lockOn = true;
            return "ERROR";
        }
        
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
};

// Clear all values
function clearValues() {
    firstOperand = undefined;
    lastOperand = undefined;
};

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
};

// Change to opposite sign
function changeSign(val) {  
  if(val > 0) {
      return -Math.abs(val);
  } else if(val < 0) {
      return Math.abs(val);
  } else return val;
};

// Change to float
function toFloat(str) {
    if(!isFloat(str)) {
        return str + '.';
    } else return str;
};

// Evaluate float
function isFloat(val) {
    return Array.from(val).some(element => element === '.');
};

function formatDisplay(str) {
    let arrStr = Array.from(str);

    if(isFloat(str)) {
        if(arrStr.length > 15) {
            str = parseFloat(str);
            str = str.toFixed(1);
            return str;
        } else return str;
    } else {
        if(arrStr.length > 10) {
            arrStr.splice(16, (arrStr.length-16));
            str = arrStr.join("");
            str += "~";
            return str;
        } else return str;
    }
};

function hasProperLength(str) {
    let arrStr = Array.from(str);
    return arrStr.length < 16;
};