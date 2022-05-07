import { ref, readonly, Ref } from 'vue';
import { OPERATORS, DIGITS } from '../shared/constants';

export function useCalculate() {
  let memory: Ref<string> = ref('');
  let error: Ref<boolean> = ref(false);

  function lengthOfLastExpression(string: string): number {
    const lastExpression = string.split(' ').pop();
    return lastExpression === '' ? 1 : lastExpression?.length || 0;
  }

  function lastDigit(string: string): string {
    return string[string.length - 1];
  }

  function isOperator(string: string): boolean {
    return OPERATORS.includes(string);
  }

  function isDigit(string: string): boolean {
    return DIGITS.includes(string);
  }

  function eraseLast(): void {
    if (!memory.value.length) return;

    memory.value = memory.value.slice(
      0,
      memory.value.length - lengthOfLastExpression(memory.value),
    );
  }

  function clear(): void {
    memory.value = '';
    error.value = false;
  }

  function addDigit(digit: string): void {
    if (!isDigit(digit)) {
      throw new Error('Invalid param, is not a valid digit');
    }

    if (error.value) clear();

    if (lastDigit(memory.value) === '.' && digit === '.') return;

    if (isOperator(lastDigit(memory.value))) return;

    memory.value += digit;
  }

  function addOperator(operator: string): void {
    if (!isOperator(operator)) {
      throw new Error('Invalid param, is not a valid operator');
    }

    if (error.value) clear();

    if (!memory.value || lastDigit(memory.value) !== ' ') return;

    memory.value += operator;
  }

  function addSpace(): void {
    if (lastDigit(memory.value) === ' ') return;

    memory.value += ' ';
  }

  function addNegate(): void {
    if (!memory.value || lastDigit(memory.value) !== ' ') return;

    memory.value += 'NEGATE';
  }

  function calculateResult(): void {
    if (!memory.value) return;

    // Source: https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
    function returnTrueValueOfFloat(result: number): number {
      return parseFloat(result.toPrecision(12));
    }

    const splitMemory: (string | number)[] = memory.value
      .trim()
      .split(' ')
      .map(el => parseFloat(el) || el);

    try {
      const reducedStack = splitMemory.reduce((stack: number[], currentValue: string | number) => {
        if (typeof currentValue === 'string') {
          /**
           * Occurs only if other operator than NEGATE is added to the stack when only one number is stored
           * (or if NEGATE is added to the stack when the stack is empty)
           */
          if (
            (currentValue !== 'NEGATE' && stack.length < 2) ||
            (currentValue === 'NEGATE' && !stack.length)
          ) {
            throw new Error('Input error');
          }

          switch (currentValue) {
            case 'NEGATE':
              stack[stack.length - 1] *= -1;
              break;
            case '+':
              stack[stack.length - 2] += stack.pop()!;
              break;
            case '-':
              stack[stack.length - 2] -= stack.pop()!;
              break;
            case '*':
              stack[stack.length - 2] *= stack.pop()!;
              break;
            case '/':
              stack[stack.length - 2] /= stack.pop()!;
              break;
          }
        } else {
          stack.push(currentValue);
        }

        return stack;
      }, []);

      // Occurs only when the number of operands is strictly greater than (the number of operators except NEGATE + 1)
      if (reducedStack.length !== 1) {
        throw new Error('Input error');
      }

      const result = reducedStack.pop()!;

      memory.value = `${result % 1 ? returnTrueValueOfFloat(result) : result}`;
    } catch (err) {
      error.value = true;
      memory.value = '';
    }
  }

  return {
    memory: readonly(memory),
    error: readonly(error),
    eraseLast,
    clear,
    addDigit,
    addOperator,
    addSpace,
    addNegate,
    calculateResult,
  };
}
