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
        drawNumber(e);
    });
});

other.forEach(btn => {
    btn.addEventListener('click', e => {
        let id = e.target.id;
        
        if(id === 'AC') {
            clearValues();
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
function operate(operator, x, y) {
    if(operator === '+') {
        return add(x, y);
    } else if(operator === '-') {
        return substract(x, y);
    } else if (operator === '/') {
        return divide(x, y);
    } else return multiply(x, y);
}

// Clear all values
function clearValues() {
    firstOperand = 0;
    lastOperand = 0;
    operator = '';
    isFloat = false;
    display.textContent = '0';
}

// Remove last digit
function deleteLastDigit(str) {
    let arr = Array.from(str);
    console.log(arr);
    arr.pop();
    console.log(arr);
    str = arr.join("");
    console.log(str);
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
    // Find out if there's already a '.' in the displayed value
    if(!Array.from(str).some(element => element === '.')) {
        return str + '.';
    } else {
        return str;
    }
}

