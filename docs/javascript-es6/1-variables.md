# 📦 JavaScript Variables — `var` vs `let` vs `const`

## Understanding variables is **fundamental to mastering JavaScript**.  

### This guide explains:

- Scope
- Hoisting
- Temporal Dead Zone (TDZ)
- Re-declaration
- Re-assignment
- Real-world usage
- Best practices

---

# 🧠 Why Variables Matter?

Variables store data that can be used and modified in a program.

JavaScript provides three ways to declare variables:

```js
var
let
const
``` 
Each behaves differently.

# 🔶 var — Function Scoped (Legacy)

⚠️ Avoid in modern JavaScript

## ✅ Key Characteristics

- Function scoped  
- Hoisted and initialized with undefined  
- Can be re-declared  
- Can be reassigned  
- Not block scoped  

## 📌 Example — No Block Scope

```js
function test() {
  var x = 10;

  if (true) {
    var x = 20;
    console.log(x); // 20
  }

  console.log(x); // 20 ❗ same variable
}
``` 


## 🔼 Hoisting with var

```js
console.log(a); // undefined
var a = 5;
``` 

## Internally:

```js
var a;
console.log(a);
a = 5;
``` 

## ❌ Re-declaration Allowed

```js
var a = 10;
var a = 20; // ✅ allowed
```

# 🟩 let — Block Scoped & Reassignable

**Introduced in ES6.**

## ✅ Key Characteristics

- Block scoped  
- Cannot be accessed before declaration  
- Can be reassigned  
- Cannot be re-declared in same scope  

## 📌 Block Scope

> Block scope in JavaScript refers to the concept where a variable declared within a specific code block (defined by curly braces {}) is only accessible within that block. Variables with block scope cannot be accessed from outside the block in which they were defined  

```js
if (true) {
  let x = 10;
}

console.log(x); // ❌ ReferenceError
```

## ⛔ Temporal Dead Zone (TDZ)

> - Temporal Dead Zone is a time between **when variable is declared and when it is initialized during this time you cannot use use the variable even though it exists in memory**    
> - TDZ is the period where a let or const variable is in scope but not yet usable.  
> - If you try to access it → ❌ ReferenceError  
> ### ⏱️ Why the name “Temporal”?  
> Because it’s about time (execution order), not position in the file.  

```js

console.log(a); // ❌ ReferenceError
let a = 5;

```

# 🧠 const in ES6 JavaScript

> ```const``` is a keyword introduced in ES6 (ECMAScript 2015) used to declare variables whose binding cannot be reassigned after initialization.

In simple words:
- A const variable must be assigned a value when declared  
- Its reference cannot change  
- But object/array contents can still change  

# 🏗️ Basic Syntax

```js
  const variableName = value;
```

```js
  const name = "Hemang Dave";

  console.log(name);

  output ```Hemang Dave```

```

## ⚠️ Must Be Initialized

### ```const``` must be assigned a value at declaration.

### ❌ Wrong:

```js
const a;
````
Error:

```js
Uncaught SyntaxError: Missing initializer in const declaration
```

### ✔ Correct: ###

```js
const a = 10;
```

# ❌ Cannot Be Reassigned
Once declared, you cannot assign a new value.

```js
const age = 25;

age = 30;
```
Error:

```js
TypeError: Assignment to constant variable
```

# 📦 const is Block Scoped

```const``` follows block scope, similar to let.
A block means:

```js
{ }
```

Example:

```js
{
  const a = 10;
}

console.log(a);

```

Error:

```js
ReferenceError: a is not defined

```
Because a exists only inside the block.

# 🧠 const and Hoisting

```const``` is hoisted but not initialized.

It stays in the **Temporal Dead Zone (TDZ)** until the declaration line executes.

```js
console.log(a);

const a = 10;
```

Error

```js

ReferenceError
```

## Why?

Because:  
- variable exists in memory  
- but it cannot be accessed before initialization  


# ⚡ ```const``` with Objects

Important concept for interviews.

**```const``` does NOT make objects immutable.**
It only prevents reassignment of the reference.

Example

```js
const user = {
  name: "Hemang"
};

user.name = "John";

console.log(user.name);
```

Output

```js
John
```


Object property changed successfully.

## ❌ Reassigning Object

```js

const user = {
  name: "Hemang"
};

user = {};

```

Error:

```
TypeError: Assignment to constant variable

```

Because the reference changed.

# ⚡ ```const``` with Arrays

Array elements can change.

Example:

```js
const numbers = [1,2,3];

numbers.push(4);

console.log(numbers);
```

Output:

```
[1,2,3,4]
```


But reassignment is not allowed.


```js
numbers = [5,6];

```

Error.

# 🔒 Making Objects Truly Immutable

Use:

```js
Object.freeze()
```

Example:

```js

const user = Object.freeze({
  name: "Hemang"
});

user.name = "John";

console.log(user.name);

```

Output:

```js
Hemang
```

Modification ignored.

# 🧪 Interview Example

```js
const obj = {
  value: 10
};

obj.value = 20;

console.log(obj.value);

```

Output:

```js
20
```
Reason:

*** ```const``` protects the reference, not the internal data.***

# ⚖️ ```var``` vs ```let``` vs ```const```

| Feature                 | var      | let   | const |
| ----------------------- | -------- | ----- | ----- |
| Scope                   | Function | Block | Block |
| Hoisting                | Yes      | Yes   | Yes   |
| TDZ                     | No       | Yes   | Yes   |
| Reassignment            | Yes      | Yes   | ❌ No  |
| Initialization Required | No       | No    | Yes   |


# 🎯 When Should You Use const?

Best practice:

Use ```const``` by default.

Use ```let``` only when value will change.


Example:

```js
const API_URL = "https://api.example.com";
const MAX_USERS = 100;
```

# 🚀 Real Project Example

```js
const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```


Here:
- ```express```
- ```app```  
- ```PORT```

should not be reassigned.  


# 🧠 Interview-Ready Definition

> ```const``` is an ES6 variable declaration keyword that creates a block-scoped variable whose reference cannot be reassigned after initialization. However, when used with objects or arrays, their internal properties can still be modified.


# 🏁 Key Takeaways

✔ Block scoped  
✔ Must be initialized  
✔ Cannot be reassigned  
✔ Objects/arrays can still be modified  
✔ Exists in Temporal Dead Zone  

