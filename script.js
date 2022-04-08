// Global variables
let operand_one = 0;
let operand_two = 0;

// Target display and buttons
const display = document.querySelector('.screen');
const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const other = Array.from(document.querySelectorAll('.other'));
const result = Array.from(document.querySelector('.result'));

// Add event listeners
numbers.forEach(btn => {
    btn.addEventListener('click', e => {
        if(display.textContent == 0) {
            display.textContent = e.target.innerHTML;
        } else {
            display.textContent += e.target.innerHTML;
        }
    });
});

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