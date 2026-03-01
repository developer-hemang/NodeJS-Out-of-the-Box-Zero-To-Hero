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

> Temporal Dead Zone is a time between **when variable is declared and when it is initialized during this time you cannot use use the variable event though it exists in memory  **  
> TDZ is the period where a let or const variable is in scope but not yet usable.
> If you try to access it → ❌ ReferenceError
> ⏱️ Why the name “Temporal”?
>Because it’s about time (execution order), not position in the file.  

```js

console.log(a); // ❌ ReferenceError
let a = 5;

```