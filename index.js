'use strict';

const obj = {
  bar: 1,
  foo: {
    qux: 2,
  },
};

function deepFreeze(value) {
  Object.freeze(value);

  const isValueFunction = typeof value === 'function';
  const hasOwn = Object.prototype.hasOwnProperty;

  if (value === null || value === undefined) {
    return value;
  }

  Object.getOwnPropertyNames(value).forEach((prop) => {
    if (
      hasOwn.call(value, prop) &&
      (value[prop] !== null || value[prop] !== undefined) &&
      isValueFunction
        ? prop !== 'caller' && prop !== 'callee' && prop !== 'arguments'
        : true &&
          (typeof value[prop] === 'object' ||
            typeof value[prop] === 'function') &&
          value[prop].constructor !== Buffer
    ) {
      deepFreeze(value[prop]);
    }
  });

  return value;
}

// const x = do {
//   if (foo()) {
//     f();
//   } else if (bar()) {
//     g();
//   } else {
//     h();
//   }
// };

const foo = `1${1}`;
console.log(foo);
