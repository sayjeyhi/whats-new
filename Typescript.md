---
title: TypeScript
image: /images/technologies/Typescript.png
updated: 2024-03-15
description: TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript.
tags:
  - TypeScript
  - JavaScript
  - Node.js
---

# TypeScript features
> Main features release for TypeScript since version 4

TypeScript main features on each release are listed below, click on each version title to see the features.

<details open><summary><h2>TypeScript 5.4 (2024)</h2></summary>

### Import Attributes
Allows specifying attributes for imports
```ts
import jsonData from "./data.json" with { type: "json" };
```

### const Contextual Keyword
Allows `const` in more contexts
```ts
const obj = { key: "value" } as const;
```

</details>

---

<details><summary><h2>TypeScript 5.3 (2023)</h2></summary>

### Decoupled Type and Function Parameter Lists
Allows separating types and function parameters
```ts
function foo<T>(x: T) {}
```

### New decorators syntax
Updated decorator implementation
```ts
@sealed
class MyClass {}
```

</details>

---

<details><summary><h2>TypeScript 5.2 (2023)</h2></summary>

### Explicit Resource Management
Adds `using` for resource cleanup
```ts
using resource = new SomeResource();
```

</details>

---

<details><summary><h2>TypeScript 5.1 (2023)</h2></summary>

### Easier Implicit Returns for `void` Functions
No longer requires `return` for void functions
```ts
function logMessage(): void {
  console.log("Hello");
}
```

</details>

---

<details><summary><h2>TypeScript 5.0 (2023)</h2></summary>

### Enum Unions as Discriminants
Allows union types to be used in discriminated unions
```ts
type Shape = { kind: "circle", radius: number } | { kind: "square", side: number };
```

### New decorators
Standardized decorator support
```ts
@sealed
class MyClass {}
```

</details>

---

<details><summary><h2>TypeScript 4.9 (2022)</h2></summary>

### `satisfies` Operator
Ensures type compatibility without altering type inference
```ts
const palette = {
  primary: "#ff0000",
} satisfies Record<string, string>;
```

</details>

---

<details><summary><h2>TypeScript 4.8 (2022)</h2></summary>

### Improved Inference for Object Methods
Better inference for method assignments
```ts
const obj = {
  method() {
    return "Hello";
  },
};
```

</details>

---

<details><summary><h2>TypeScript 4.7 (2022)</h2></summary>

### ECMAScript Module Support in Node.js
Enables native ESM support
```ts
import { readFile } from "fs/promises";
```

</details>

---

<details><summary><h2>TypeScript 4.6 (2022)</h2></summary>

### Control Flow Analysis for Destructured Variables
Improves type narrowing for destructuring
```ts
function process(obj: { x?: number }) {
  if (obj.x) {
    const { x } = obj;
    console.log(x.toFixed());
  }
}
```

</details>

---

<details><summary><h2>TypeScript 4.5 (2021)</h2></summary>

### `Awaited` Utility Type
Extracts the resolved type from a promise
```ts
type Data = Awaited<Promise<string>>;
```

</details>

---

<details><summary><h2>TypeScript 4.4 (2021)</h2></summary>

### Exact Optional Property Types
Optional properties no longer allow `undefined` implicitly
```ts
interface User {
  name?: string;
}
```

</details>

---

<details><summary><h2>TypeScript 4.3 (2021)</h2></summary>

### Override Keyword
Enforces correct method overriding
```ts
class Base {
  greet(): void {}
}
class Derived extends Base {
  override greet(): void {}
}
```

</details>

---

<details><summary><h2>TypeScript 4.2 (2021)</h2></summary>

### Template Literal Type Improvements
Supports better type inference
```ts
type Color = "red" | `light${string}`;
```

</details>

---

<details><summary><h2>TypeScript 4.1 (2020)</h2></summary>

### Template Literal Types
Allows type-safe string manipulation
```ts
type Greeting = `Hello, ${string}!`;
```

</details>

---

<details><summary><h2>TypeScript 4.0 (2020)</h2></summary>

### Variadic Tuple Types
Supports tuple manipulation
```ts
type MyTuple = [string, ...number[]];
```

</details>
