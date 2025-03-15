---
title: Ecma script
image: /images/technologies/Ecmascript.png
updated: 2024-03-15
description: Ecmascript is a standardized version of JavaScript.
tags:
  - Ecmascript
  - Javascript
  - Node.js
---

# Ecma script features
> from revolutionary es6 till current latest release

Ecma script main features on each release are listed below, click on each version title to see the features.

<details open><summary><h2>ES2024 </h2></summary>

### Symbols as WeakMap keys
Symbols can now be used as keys in WeakMaps
```js
const sym = Symbol("key");
const weakMap = new WeakMap();
weakMap.set(sym, "value");
```

### Array.fromAsync
Create an array from async iterables
```js
const asyncGen = async function*() { yield 1; yield 2; };
console.log(await Array.fromAsync(asyncGen()));
```
</details>

---

<details><summary><h2>ES2023 </h2></summary>

### Array.prototype.toSorted
Sort without mutating original array
```js
const arr = [3, 1, 2];
console.log(arr.toSorted());
```

### Hashbang (#!) in JavaScript files
Support for Unix-style shebang
```js
#!/usr/bin/env node
console.log("Hello, Node.js!");
```

</details>

---

<details><summary><h2>ES2022 </h2></summary>

### Top-Level Await
Use `await` outside of async functions
```js
const data = await fetch("https://api.example.com").then(res => res.json());
```

### Object.hasOwn
Check for own properties safely
```js
console.log(Object.hasOwn({a: 1}, "a"));
```

</details>

---

<details><summary><h2>ES2021 </h2></summary>

### String.prototype.replaceAll
Replace all occurrences of a substring
```js
console.log("hello hello".replaceAll("hello", "hi"));
```

### Numeric Separators
Improve number readability
```js
const num = 1_000_000;
```

</details>

---

<details><summary><h2>ES2020 </h2></summary>

### Nullish Coalescing Operator (??)
Return right operand if left is null or undefined
```js
console.log(null ?? "default"); // "default"
```

### Optional Chaining (?.)
Avoid errors when accessing deep properties
```js
const obj = {};
console.log(obj?.prop?.nested);
```

</details>

---

<details><summary><h2>ES2019 </h2></summary>

### Array.prototype.flat
Flatten nested arrays
```js
console.log([1, [2, [3]]].flat(2));
```

### String.prototype.trimStart & trimEnd
Remove whitespace from start or end of a string
```js
console.log("  Hello  ".trimStart());
console.log("  Hello  ".trimEnd());
```

### Object.fromEntries
Transform key-value pairs into objects
```js
console.log(Object.fromEntries([["a", 1], ["b", 2]]));
```

### Optional Catch Binding
Omit catch parameter if unused
```js
try {
throw new Error("Oops");
} catch {
console.log("Error caught");
}
```

</details>

---

<details><summary><h2>ES2018 </h2></summary>

### Rest/Spread Properties
Spread objects
```js
const obj = {a: 1, b: 2};
const clone = {...obj};
```

### Promise.prototype.finally
Execute code after promise resolution/rejection
```js
fetchData().finally(() => console.log("Done"));
```

### Asynchronous Iteration
Use `for await...of` for async iterables
```js
async function process(items) {
for await (const item of items) {
console.log(item);
}
}
```

### RegExp Enhancements
Named capture groups, lookbehind assertions
```js
const regex = /(?<year>\d{4})-(?<month>\d{2})/;
const match = regex.exec("2023-04");
console.log(match.groups.year); // "2023"
```

</details>

---

<details><summary><h2>ES2017 </h2></summary>

### Async/Await
Syntactic sugar for promises
```js
async function fetchData() {
return await Promise.resolve("Data");
}
```

### Object.values and Object.entries
Get object values and key-value pairs
```js
console.log(Object.values({a: 1, b: 2}));
console.log(Object.entries({a: 1, b: 2}));
```

### String.prototype.padStart & padEnd
Pad strings with characters
```js
console.log("5".padStart(3, "0")); // "005"
console.log("5".padEnd(3, "0")); // "500"
```

### Trailing commas in function parameters
Allow trailing commas in function definitions
```js
function foo(a, b,) {
console.log(a, b);
}
```

### Shared memory and Atomics
Enable multi-threaded operations
```js
const sharedBuffer = new SharedArrayBuffer(16);
const int32 = new Int32Array(sharedBuffer);
Atomics.store(int32, 0, 123);
```

</details>

---

<details><summary><h2>ES2016 </h2></summary>

### Array.prototype.includes
Check if an array contains an element
```js
console.log([1, 2, 3].includes(2)); // true
```

### Exponentiation Operator
** as a shorthand for Math.pow
```js
console.log(2 ** 3); // 8
```

</details>

---

<details><summary><h2>ES2015 (es6) </h2></summary>

### let and const
Block-scoped variable declarations
```js
let x = 10;
const y = 20;
```

### Arrow Functions
Shorter function syntax with lexical `this`
```js
const add = (a, b) => a + b;
```

### Template Literals
String interpolation using backticks
```js
const name = "Jafar";
console.log(`Hello, ${name}!`);
```

</details>
