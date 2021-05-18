// Calculator functionality
class Calculator {
  constructor() {
    this.result = 0;
    this.operation = '';
    this.initiated = false;
    this.active = false;
  }

  getResult() {
    const decimal = this.result.toString().split('.')[0];
    const fraction = this.result.toString().split('.')[1];
    const decimalLength = decimal.length;

    if (decimalLength - 9 >= 0) {
      return this.result.toExponential(2);
    }

    if (!fraction) {
      return this.result.toString();
    }

    return parseFloat(
      this.result.toFixed(Math.abs(8 - decimalLength))
    ).toString();
  }

  getOperation() {
    return this.operation;
  }

  setOperation(op) {
    this.operation = op;
  }

  isActive() {
    return this.active;
  }

  activate() {
    this.active = true;
  }

  desactivate() {
    this.active = false;
  }

  isInitiated() {
    return this.initiated;
  }

  initiat(value) {
    if (!this.initiated) {
      this.result = Number(value);
      this.initiated = true;
    }
  }

  stop() {
    this.result = 0;
    this.operation = '=';
    this.initiated = false;
    this.active = false;
  }

  reset() {
    this.result = 0;
    this.operation = '';
    this.initiated = false;
    this.active = false;
  }

  calculate(value) {
    const num = Number(value);
    switch (this.operation) {
      case '+':
        this.result += num;
        break;
      case '-':
        this.result -= num;
        break;
      case 'x':
        this.result *= num;
        break;
      case '/':
        if (num === 0) break;
        this.result /= num;
        break;
      default:
        break;
    }
    this.operation = '';
  }
}

const calculator = new Calculator();
const screen = document.querySelector('.screen input');
updateScreen('0');

const keypad = document.querySelector('.keys');
keypad.addEventListener('click', (e) => {
  const key = e.target;
  if (!key.classList.contains('key')) return;

  const keyVal = key.innerText.toLowerCase();
  if (key.classList.contains('nums')) {
    handleNumbers(keyVal);
  } else if (keyVal === 'del') {
    handleDelete();
  } else if (keyVal === 'reset') {
    handleReset();
  } else if (key.classList.contains('ops')) {
    handleOperations(keyVal);
  } else {
    handleEquation();
  }
});

function updateScreen(value = '0') {
  screen.value = value;
}

function handleNumbers(keyVal) {
  const operation = calculator.getOperation();
  if (operation === '=') {
    updateScreen(keyVal);
    calculator.setOperation('');
  } else if (operation && !calculator.isActive()) {
    calculator.initiat(screen.value);
    calculator.activate();
    updateScreen(keyVal);
  } else {
    if (screen.value.length === 9) return;
    if (keyVal === '.' && screen.value.includes('.')) return;
    updateScreen(
      screen.value === '0' || operation === '=' ? keyVal : screen.value + keyVal
    );
  }
}

function handleDelete() {
  if (screen.value.length === 1) {
    updateScreen('0');
  } else {
    updateScreen(screen.value.slice(0, screen.value.length - 1));
  }

  if (calculator.getOperation() === '=') {
    calculator.setOperation('');
  }
}

function handleReset() {
  updateScreen('0');
  calculator.reset();
}

function handleOperations(keyVal) {
  if (calculator.isActive()) {
    calculator.calculate(screen.value);
    updateScreen(calculator.getResult());
    calculator.desactivate();
  }
  calculator.setOperation(keyVal);
}

function handleEquation() {
  calculator.calculate(screen.value);
  updateScreen(calculator.getResult());
  calculator.stop();
}
