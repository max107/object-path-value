"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
var isObject = function (obj) { return typeof obj === 'object'; };
var isArray = function (obj) { return Array.isArray(obj); };
var getFromArray = function (obj, prop) {
    if (obj && prop && Array.isArray(obj) && obj.indexOf(prop)) {
        return obj[prop];
    }
};
var getFromObject = function (obj, prop) {
    if (obj && prop && obj.hasOwnProperty(String(prop))) {
        return obj[String(prop)];
    }
};
var getProperty = function (obj, prop) {
    if (isObject(obj)) {
        return getFromObject(obj, prop);
    }
    if (isArray(obj)) {
        return getFromArray(obj, prop);
    }
};
var isValid = function (obj) { return isObject(obj) || isArray(obj); };
exports.getValue = function (obj, path, defaultValue) {
    if (!isValid(obj)) {
        return obj;
    }
    if (!path || null === obj) {
        return defaultValue;
    }
    if (typeof path === 'number') {
        path = [path];
    }
    if (typeof path === 'string') {
        if (typeof obj === 'object' && path in obj) {
            return getProperty(obj, path);
        }
        return exports.getValue(obj, path.split('.'), defaultValue);
    }
    var _a = __spreadArrays(path), firstKey = _a[0], rest = _a.slice(1);
    var nextObj = getProperty(obj, firstKey);
    if (nextObj === void 0) {
        return defaultValue;
    }
    if (isValid(nextObj)) {
        return exports.getValue(nextObj, rest, defaultValue);
    }
    return nextObj;
};
exports.default = exports.getValue;
