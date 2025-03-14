# PHP
> Old school PHP, the language most of us used and still not dead!

PHP language main features on each release are listed below, click on each version title to see the features.


<details open><summary><h2>PHP 7.0 (2015)</h2></summary>

### Scalar Type Declarations
Allows specifying parameter and return types
```php
function add(int $a, int $b): int {
return $a + $b;
}
```

### Null Coalescing Operator (??)
Returns the first non-null operand
```php
$username = $_GET['user'] ?? 'guest';
```

### Spaceship Operator (<=>)
Three-way comparison
```php
echo 2 <=> 3; // -1
```

</details>

---

<details><summary><h2>PHP 7.1 (2016)</h2></summary>

### Nullable Types
Allows null values in type hints
```php
function setAge(?int $age) {}
```

### Iterable Type Hint
Allows any iterable (arrays, Traversable)
```php
function foo(iterable $items) {}
```

### Void Return Type
Function must not return a value
```php
function test(): void {
echo "Hello";
}
```

</details>

---

<details><summary><h2>PHP 7.2 (2017)</h2></summary>

### Object Type Hint
Allows specifying "object" as a type hint
```php
function setObject(object $obj) {}
```

### Argon2 Password Hashing
Stronger password hashing algorithm
```php
$password = password_hash('secret', PASSWORD_ARGON2I);
```

</details>

---

<details><summary><h2>PHP 7.3 (2018)</h2></summary>

### Trailing Commas in Function Calls
Allows trailing commas in function calls
```php
function test($a, $b,) {}
```

### JSON_THROW_ON_ERROR
Throws exception on JSON errors
```php
json_decode("invalid", false, 512, JSON_THROW_ON_ERROR);
```

</details>

---

<details><summary><h2>PHP 7.4 (2019)</h2></summary>

### Typed Properties
Allows type hints for class properties
```php
class User {
public int $id;
}
```

### Arrow Functions
Shorter syntax for anonymous functions
```php
$add = fn($a, $b) => $a + $b;
```

</details>

---

<details><summary><h2>PHP 8.0 (2020)</h2></summary>

### Named Arguments
Pass arguments by name
```php
function test($a, $b) {}
test(b: 2, a: 1);
```

### Match Expression
Switch alternative with strict comparison
```php
$result = match($x) {
1 => 'one',
2 => 'two',
default => 'other',
};
```

</details>

---

<details><summary><h2>PHP 8.1 (2021)</h2></summary>

### Enumerations (Enums)
Define a set of possible values
```php
enum Status {
case Pending;
case Approved;
}
```

### Readonly Properties
Prevents property modification
```php
class User {
public readonly string $name;
}
```

</details>

---

<details><summary><h2>PHP 8.2 (2022)</h2></summary>

### Disjunctive Normal Form (DNF) Types
Combine types using OR
```php
function test((A&B)|C $x) {}
```

### Readonly Classes
Make entire class readonly
```php
readonly class User {
public string $name;
}
```

</details>

---

<details><summary><h2>PHP 8.3 (2023)</h2></summary>

### Typed Class Constants
Allows type hints for class constants
```php
class A {
public const int VALUE = 10;
}
```

### json_validate Function
Validate JSON without decoding
```php
json_validate('{"key": "value"}');
