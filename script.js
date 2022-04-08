// Target display and buttons
const display = document.querySelector('.screen');
const buttons = Array.from(document.querySelectorAll('.button'));

// Add event listeners
buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        if(display.textContent == 0) {
            display.textContent = e.target.innerHTML;
        } else {
            display.textContent += e.target.innerHTML;
        }
        display.textContent
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

function operate(operator, x, y) {
    if(operator === '+') {
        return add(x, y);
    } else if(operator === '-') {
        return substract(x, y);
    } else if (operator === '/') {
        return divide(x, y);
    } else return multiply(x, y);
}