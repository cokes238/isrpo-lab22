export class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.expression = '';
        this.hasError = false;
    }

    init(buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleButtonClick(button.textContent);
            });
        });
    }

    handleButtonClick(value) {
        if (this.hasError && value !== 'C') {
            this.clear();
        }

        switch (value) {
            case 'C':
                this.clear();
                break;
            case '=':
                this.calculate();
                break;
            default:
                this.appendValue(value);
                break;
        }
    }

    appendValue(value) {
        if (this.expression === '' && this.isOperator(value)) {
            return;
        }

        if (this.isOperator(value) && this.isLastCharOperator()) {
            return;
        }

        if (value === '.' && this.hasDuplicateDot()) {
            return;
        }

        this.expression += value;
        this.updateDisplay();
    }

    calculate() {
        if (this.expression === '') {
            return;
        }

        if (this.isLastCharOperator()) {
            this.showError();
            return;
        }

        const result = this.safeEvaluate(this.expression);
        if (result !== null) {
            this.expression = String(result);
            this.updateDisplay();
        } else {
            this.showError();
        }
    }

    safeEvaluate(expr) {
        if (!this.isValidExpression(expr)) {
            return null;
        }

        try {
            const result = new Function('return (' + expr + ')')();
            if (isNaN(result) || !isFinite(result)) {
                return null;
            }
            return result;
        } catch (error) {
            return null;
        }
    }

    isValidExpression(expr) {
        if (/[\+\-\*\/]{2,}/.test(expr)) {
            return false;
        }
        if (/[\+\-\*\/]$/.test(expr)) {
            return false;
        }
        if (/\.\d*\./.test(expr)) {
            return false;
        }
        return true;
    }

    clear() {
        this.expression = '';
        this.hasError = false;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.hasError) {
            this.displayElement.value = 'Ошибка';
        } else if (this.expression === '') {
            this.displayElement.value = '0';
        } else {
            this.displayElement.value = this.expression;
        }
    }

    showError() {
        this.hasError = true;
        this.expression = '';
        this.updateDisplay();
    }

    isOperator(char) {
        return ['+', '-', '*', '/'].includes(char);
    }

    isLastCharOperator() {
        if (this.expression === '') return false;
        const lastChar = this.expression[this.expression.length - 1];
        return this.isOperator(lastChar);
    }

    hasDuplicateDot() {
   
        const parts = this.expression.split(/[\+\-\*\/]/);
        const lastNumber = parts[parts.length - 1];
        return lastNumber.includes('.');
    }
}