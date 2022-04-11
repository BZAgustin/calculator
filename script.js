// Global variables
let firstOperand = 0;
let lastOperand = 0;
let operator = '';
let isFloat = false;

// Target display and buttons
const display = document.querySelector('.screen');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const other = Array.from(document.querySelectorAll('.other'));
const result = Array.from(document.querySelector('.result'));

// Add event listeners
numbers.forEach(btn => {
    btn.addEventListener('click', e => {
        drawNumber(e);
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
}

// Remove last digit
function deleteLastDigit(str) {
    return str.pop();
}

// Change to opposite sign
function changeSign(val) {  
  if(val > 0) {
      return -Math.abs(val);
  } else if(val < 0) {
      return Math.abs(val);
  } else return val;
}

