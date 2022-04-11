// Global variables
let firstOperand = 0;
let lastOperand = 0;
let operator = '';

// Target display and buttons
const display = document.querySelector('.screen');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const other = Array.from(document.querySelectorAll('.other'));
const result = Array.from(document.querySelector('.result'));

// Add number buttons' event listeners
numbers.forEach(btn => {
    btn.addEventListener('click', e => {
        if(operator != '') {
            display.textContent = '';
            drawNumber(e);
            operator = '';
        } else {
            drawNumber(e);
        }
        
    });
});

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

operators.forEach(btn => {
    btn.addEventListener('click', e => {
        let id = e.target.id;
        
        // Check if there's an operation already going
        if(operator != '') {
            console.log('Operator is defined');
            // Check whether the operation button is being pressed twice
            if(lastOperand === 0) {
                console.log('No last operand. Returning');
            } else {
                console.log('Operation and last operand found. Displaying solved operation');
                display.textContent = solveOperation(operator, firstOperand, lastOperand);
            }
        }
        
        if(id === 'add') {
            console.log('Current operator: plus');
            operator = '+';
        } else if(id === 'substract') {
            console.log('Current operator: minus');
            operator = '-';
        } else if(id === 'multiply') {
            console.log('Current operator: times');
            operator = '*';
        } else {
            console.log('Current operator: by');
            operator = '/';
        } 
        
        if(display.textContent != '0') {
            if(firstOperand === 0) {
                console.log('No first operand found. Saving display as 1st operand');
                firstOperand = display.textContent;
            } else {
                console.log('First operand found. Saving display as 2nd operand and solving operation');
                lastOperand = display.textContent;
                display.textContent = solveOperation(operator, firstOperand, lastOperand);
            }
        } else return;
        
    });
})

// Draw number on screen
function drawNumber(e) {
    if(display.textContent == 0) {
        if(e.target.id === 'zero') {
            display.textContent = '0';
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
        display.textContent = add(x, y);
        clearValues();
        return add(x, y);
    } else if(operator === '-') {
        display.textContent = substract(x, y);
        clearValues();
        return substract(x, y);
    } else if (operator === '/') {
        display.textContent = divide(x, y);
        clearValues();
        return divide(x, y);
    } else {
        display.textContent = multiply(x, y);
        clearValues();
        return multiply(x, y);
    }
}

// Clear all values
function clearValues() {
    firstOperand = 0;
    lastOperand = 0;
    operator = '';
}

// Remove last digit
function deleteLastDigit(str) {
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