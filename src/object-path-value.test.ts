import getValue from './object-path-value';

test('object', () => {
  expect(getValue({ foo: { bar: 'hello world' } }, 'foo.bar')).toEqual('hello world');
  expect(getValue({ foo: 'bar' }, 'foo')).toEqual('bar');
});

test('string', () => {
  expect(getValue('string', 'foo')).toEqual('string');
  expect(getValue('', 'foo')).toEqual('');
});

test('null | undefined', () => {
  expect(getValue(undefined, 'foo')).toEqual(undefined);
  expect(getValue(null, 'foo')).toEqual(undefined);
  expect(getValue(null, 'foo.bar')).toEqual(undefined);
});

test('array in object', () => {
  expect(getValue({ foo: [1, 2, 3] }, 'foo.2')).toEqual(3);
  expect(getValue({ foo: [1, 2, 3] }, ['foo', '2'])).toEqual(3);
  expect(getValue({ foo: [1, 2, 3] }, ['foo', 2])).toEqual(3);
});

test('array', () => {
  expect(getValue([1, 2, 3], 2)).toEqual(3);
  expect(getValue([1, [1, 2, 3], 4], '1.1')).toEqual(2);
  expect(getValue([1, [1, 2, 3], 4], '1.10')).toBeUndefined();
  expect(getValue([1, [1, 2, 3], 4], '1.10', 'yo')).toEqual('yo');
  expect(getValue([1, 2, '3'], '2')).toEqual('3');
});

test('undefined', () => {
  expect(getValue([1, 2, 3], 20)).toEqual(undefined);
});

test('default value', () => {
  expect(getValue([1, 2, 3], 20, 5)).toEqual(5);
  expect(getValue({}, 'foobar', 5)).toEqual(5);
  expect(getValue({}, undefined, 5)).toEqual(5);
});

test('array of objects', () => {
  expect(getValue(
    {
      foo: [
        { result: false },
        { result: true },
        { result: false }
      ]
    },
    'foo.1.result'
  )).toEqual(true);
});
