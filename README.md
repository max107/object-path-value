[![Build Status](https://travis-ci.org/max107/object-path-value.svg?branch=master)](https://travis-ci.org/max107/object-path-value)

# Install

```bash
npm install object-path-value
yarn add object-path-value
```

# Usage

```javascript
let getValue = require('object-path-value');

console.log(getValue([1, 2, 3], 1) === 2);
console.log(getValue({ foo: { bar: 'hello world' } }, 'foo.bar') === 'hello world');
console.log(getValue({ foo: { bar: [1, 2, 3] } }, 'foo.bar.0') === 1);
```
