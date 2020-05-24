"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var object_path_value_1 = __importDefault(require("./object-path-value"));
test('object', function () {
    expect(object_path_value_1.default({ foo: { bar: 'hello world' } }, 'foo.bar')).toEqual('hello world');
    expect(object_path_value_1.default({ foo: 'bar' }, 'foo')).toEqual('bar');
});
test('string', function () {
    expect(object_path_value_1.default('string', 'foo')).toEqual('string');
    expect(object_path_value_1.default('', 'foo')).toEqual('');
});
test('null', function () {
    expect(object_path_value_1.default(null, 'foo')).toEqual(undefined);
    expect(object_path_value_1.default(null, 'foo.bar')).toEqual(undefined);
});
test('array in object', function () {
    expect(object_path_value_1.default({ foo: [1, 2, 3] }, 'foo.2')).toEqual(3);
    expect(object_path_value_1.default({ foo: [1, 2, 3] }, ['foo', '2'])).toEqual(3);
    expect(object_path_value_1.default({ foo: [1, 2, 3] }, ['foo', 2])).toEqual(3);
});
test('array', function () {
    expect(object_path_value_1.default([1, 2, 3], 2)).toEqual(3);
    expect(object_path_value_1.default([1, 2, '3'], '2')).toEqual('3');
});
test('undefined', function () {
    expect(object_path_value_1.default([1, 2, 3], 20)).toEqual(undefined);
});
test('default value', function () {
    expect(object_path_value_1.default([1, 2, 3], 20, 5)).toEqual(5);
    expect(object_path_value_1.default({}, 'foobar', 5)).toEqual(5);
    expect(object_path_value_1.default({}, undefined, 5)).toEqual(5);
});
test('array of objects', function () {
    expect(object_path_value_1.default({
        foo: [
            { result: false },
            { result: true },
            { result: false }
        ]
    }, 'foo.1.result')).toEqual(true);
});
