import { useCalculate } from '../../../src/compositions/useCalculate';

function addMultiplesDigits(string: string, addDigit: (s: string) => void) {
  const digits = string.split('');
  digits.forEach((digit) => addDigit(digit));
}

describe('useCalculate', () => {
  it('should add digits to the memory', () => {
    // GIVEN
    const { addDigit, memory } = useCalculate();
    const expectedDigit = '1234567890';

    // WHEN
    addMultiplesDigits(expectedDigit, addDigit);

    // THEN
    expect(memory.value).toEqual(expectedDigit);
  });

  it('should prevent to add operators before number', () => {
    // GIVEN
    const { addOperator, memory } = useCalculate();

    // WHEN
    addOperator('+');
    addOperator('*');
    addOperator('/');
    addOperator('-');

    // THEN
    expect(memory.value).toEqual('');
  });

  it('should prevent to add multiples operators in sequence', () => {
    // GIVEN
    const { addOperator, addDigit, addNegate, addSpace, memory } = useCalculate();

    // WHEN
    addDigit('5');
    addSpace();
    addOperator('+');

    // THEN
    expect(memory.value).toEqual('5 +');

    // WHEN
    addOperator('-');

    // THEN
    expect(memory.value).toEqual('5 +');

    // WHEN
    addOperator('*');

    // THEN
    expect(memory.value).toEqual('5 +');

    // WHEN
    addOperator('/');

    // THEN
    expect(memory.value).toEqual('5 +');

    // WHEN
    addNegate();

    // THEN
    expect(memory.value).toEqual('5 +');
  });

  it('should remove extra space at the end of expression', () => {
    // GIVEN
    const { addDigit, addSpace, calculateResult, memory } = useCalculate();

    // WHEN
    addDigit('8');
    addSpace();
    calculateResult();

    // THEN
    expect(memory.value).toEqual('8');
  });

  it('should delete last digit or operator correctly', () => {
    // GIVEN
    const { addOperator, addDigit, addSpace, addNegate, eraseLast, memory } = useCalculate();

    // WHEN
    addDigit('5');
    addSpace();
    addDigit('9');
    addSpace();
    addNegate();
    addSpace();
    addOperator('+');
    addSpace();

    // THEN
    expect(memory.value).toEqual('5 9 NEGATE + ');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5 9 NEGATE +');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5 9 NEGATE ');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5 9 NEGATE');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5 9 ');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5 9');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5 ');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('5');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('');

    // WHEN
    eraseLast();

    // THEN
    expect(memory.value).toEqual('');
  });

  it("should clear memory", () => {
    // GIVEN
    const { clear, addOperator, addDigit, addSpace, memory } = useCalculate();

    // WHEN
    addDigit('8');
    addSpace();
    addDigit('4');
    addSpace();
    addOperator('/');
    clear();

    // THEN
    expect(memory.value).toEqual('');
  });

  it('should throws a error when calls addDigit passing a non digit', () => {
    // GIVEN
    const { addDigit } = useCalculate();

    // THEN
    expect(() => addDigit('b')).toThrowError();
    expect(() => addDigit('y')).toThrowError();
    expect(() => addDigit('*')).toThrowError();
    expect(() => addDigit(' ')).toThrowError();
    expect(() => addDigit('/')).toThrowError();
  });

  it('should throws a error when calls addOperator passing a non operator', () => {
    // GIVEN
    const { addOperator } = useCalculate();

    // THEN
    expect(() => addOperator('a')).toThrowError();
    expect(() => addOperator('5')).toThrowError();
    expect(() => addOperator(' ')).toThrowError();
    expect(() => addOperator('.')).toThrowError();
  });

  describe('should calculate valid math expressions like ', () => {
    it('2 4 +', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      addSpace();
      addOperator('+');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('6');
    });

    it('2 4 -', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      addSpace();
      addOperator('-');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('-2');
    });

    it('2 4 *', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      addSpace();
      addOperator('*');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('8');
    });

    it('2 4 /', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      addSpace();
      addOperator('/');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('0.5');
    });

    it('5 NEGATE', () => {
      // GIVEN
      const { addDigit, addSpace, addNegate, calculateResult, memory } = useCalculate();

      // WHEN
      addDigit('5');
      addSpace();
      addNegate();
      calculateResult();

      // THEN
      expect(memory.value).toEqual('-5');
    });

    it('5 2 NEGATE *', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, addNegate, calculateResult, memory } = useCalculate();

      // WHEN
      addDigit('5');
      addSpace();
      addDigit('2');
      addSpace();
      addNegate();
      addSpace();
      addOperator('*');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('-10');
    });

    it('156 NEGATE NEGATE', () => {
      // GIVEN
      const { addDigit, addSpace, addNegate, calculateResult, memory } = useCalculate();

      // WHEN
      addMultiplesDigits('156', addDigit);
      addSpace();
      addNegate();
      addSpace();
      addNegate();
      calculateResult();

      // THEN
      expect(memory.value).toEqual('156');
    });

    it('7.1 1.2 - 4.5 +', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addMultiplesDigits('7.1', addDigit);
      addSpace();
      addMultiplesDigits('1.2', addDigit);
      addSpace();
      addOperator('-');
      addSpace();
      addMultiplesDigits('4.5', addDigit);
      addSpace();
      addOperator('+');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('10.4');
    });

    it('.15 .45 + .2 - .05 +', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addMultiplesDigits('.15', addDigit);
      addSpace();
      addMultiplesDigits('.45', addDigit);
      addSpace();
      addOperator('+');
      addSpace();
      addMultiplesDigits('.2', addDigit);
      addSpace();
      addOperator('-');
      addSpace();
      addMultiplesDigits('.05', addDigit);
      addSpace();
      addOperator('+');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('0.45');
    });

    it('34 0.5 * .125 / 0.55 + .12 -', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory } = useCalculate();

      // WHEN
      addMultiplesDigits('34', addDigit);
      addSpace();
      addMultiplesDigits('0.5', addDigit);
      addSpace();
      addOperator('*');
      addSpace();
      addMultiplesDigits('.125', addDigit);
      addSpace();
      addOperator('/');
      addSpace();
      addMultiplesDigits('4.48', addDigit);
      addSpace();
      addOperator('+');
      addSpace();
      addMultiplesDigits('.12', addDigit);
      addSpace();
      addOperator('-');
      calculateResult();

      // THEN
      expect(memory.value).toEqual('140.36');
    });
  })

  describe('should set error to true when calls calculate result with invalid math expression like ', () => {
    it('2 4', () => {
      // GIVEN
      const { addDigit, addSpace, calculateResult, memory, error } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      calculateResult();

      // THEN
      expect(memory.value).toBe('');
      expect(error.value).toBe(true);
    });

    it('2 4 - -', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, calculateResult, memory, error } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      addSpace();
      addOperator('-');
      addSpace();
      addOperator('-');
      calculateResult();

      // THEN
      expect(memory.value).toBe('');
      expect(error.value).toBe(true);
    });
    it('2 4 - NEGATE - NEGATE', () => {
      // GIVEN
      const { addOperator, addDigit, addSpace, addNegate, calculateResult, memory, error } = useCalculate();

      // WHEN
      addDigit('2');
      addSpace();
      addDigit('4');
      addSpace();
      addOperator('-');
      addSpace();
      addNegate();
      addSpace();
      addOperator('-');
      addSpace();
      addNegate();
      calculateResult();

      // THEN
      expect(memory.value).toBe('');
      expect(error.value).toBe(true);
    });
  })

  describe('should prevent some obvious input errors like ', () => {
    it('NEGATE', () => {
      // GIVEN
      const { addNegate, calculateResult, memory } = useCalculate();

      // WHEN
      addNegate();
      calculateResult();

      // THEN
      expect(memory.value).toBe('');
    });

    it('+, -, * or /', () => {
      // GIVEN
      const { addOperator, calculateResult, memory } = useCalculate();

      // WHEN
      addOperator('+');
      calculateResult();

      // THEN
      expect(memory.value).toBe('');

      // WHEN
      addOperator('-');
      calculateResult();

      // THEN
      expect(memory.value).toBe('');

      // WHEN
      addOperator('*');
      calculateResult();

      // THEN
      expect(memory.value).toBe('');

      // WHEN
      addOperator('/');
      calculateResult();

      // THEN
      expect(memory.value).toBe('');
    });
  })
})