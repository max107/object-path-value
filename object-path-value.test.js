let getValue = require('./object-path-value');

test('object', () => {
    const result = getValue({ foo: { bar: 'hello world' } }, 'foo.bar');
    expect(result).toBe('hello world');
});

test('object string', () => {
    const result = getValue({ foo: 'bar' }, 'foo');
    expect(result).toBe('bar');
});

test('null', () => {
    const result = getValue(null, 'foo');
    expect(result).toBe(undefined);
});

test('null', () => {
    const result = getValue(null, 'foo.bar');
    expect(result).toBe(undefined);
});

test('array in object', () => {
    const result = getValue({ foo: [1, 2, 3] }, 'foo.2');
    expect(result).toBe(3);
});

test('array', () => {
    const result = getValue([1, 2, 3], 2);
    expect(result).toBe(3);
});

test('undefined', () => {
    const result = getValue([1, 2, 3], 20);
    expect(result).toBe(undefined);
});

test('default value', () => {
    expect(getValue([1, 2, 3], 20, 5)).toBe(5);

    expect(getValue({}, 'foobar', 5)).toBe(5);

    expect(getValue({}, undefined, 5)).toBe(5);
});

test('array of objects', () => {
    const result = getValue(
        { foo: [{ result: false }, { result: true }, { result: false }] },
        'foo.1.result'
    );
    expect(result).toBe(true);
});
