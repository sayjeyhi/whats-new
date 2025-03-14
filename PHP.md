# PHP
> Old school PHP, the language most of us used and still not dead!

PHP language main features on each release are listed below, click on each version title to see the features.

<details><summary><h2>PHP 8.5 (Upcoming, 2025)</h2></summary>

### (To be announced)

</details>

---

<details open><summary><h2>PHP 8.4 (2024)</h2></summary>

### Property Hooks
Allows dynamic getters and setters
```php
class User {
    public string $name;
    public function __get(string $name) {}
}
```

### Asymmetric Visibility in Classes
Different getter/setter visibility
```php
class Example {
    public function __construct(
        public string $name
    ) {}
}
```

### Database Driver-Specific PDO Classes
Enhances database-specific functionality
```php
$pdo = new MySQLiPDO("mysql:host=localhost;dbname=test");
```

### Lazy Objects
Improve memory performance by delaying initialization
```php
$object = LazyObject::create(Foo::class);
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
```

### Granular DateTime Exceptions
More specific DateTime-related exceptions
```php
try {
    new DateTime("invalid");
} catch (DateMalformedStringException $e) {
    echo "Invalid date";
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

### True, False, Null Types
Allows specifying these as standalone types
```php
function example(true $flag) {}
```

### Sensitive Parameter Redaction
Redact parameters from stack traces
```php
function login(#[\SensitiveParameter] string $password) {}
```

### New Random Extension
Better random number generation
```php
$rand = new Random\Engine\Secure();
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

### Fibers
Allows cooperative multitasking
```php
$fiber = new Fiber(function () {
    echo "Inside Fiber";
});
$fiber->start();
```

### Intersection Types
Require a type to implement multiple interfaces
```php
function process(A&B $value) {}
```

### Never Return Type
Indicates a function never returns
```php
function redirect(): never {
    exit;
}
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

### Just-In-Time Compilation (JIT)
Improves PHP performance at runtime
```php
// Enabled via php.ini: opcache.jit=1235
```

### Constructor Property Promotion
Simplifies constructor property initialization
```php
class User {
    public function __construct(private string $name) {}
}
```

### Union Types
Allows multiple types for parameters and return values
```php
function example(int|string $value) {}
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

### Underscore Numeric Separator
Improves readability of large numbers
```php
$number = 1_000_000;
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

### Heredoc/Nowdoc Syntax Improvements
Allows better indentation handling
```php
$str = <<<TEXT
    Indented text
TEXT;
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

### Class Constant Visibility
Allows visibility modifiers for class constants
```php
class MyClass {
    private const SECRET = 'hidden';
}
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

<details><summary><h2>PHP 7.0 (2015)</h2></summary>

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
