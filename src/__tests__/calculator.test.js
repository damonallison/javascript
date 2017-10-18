import Calculator from "../calculator";

const c = new Calculator();

test('addition', () => {
    expect(c.add(1, 2)).toEqual(3);
    expect(c.add(2, 2)).toEqual(4);
});

test('subtraction', () => {
    expect(c.subtract(10, 5)).toEqual(5);
});

