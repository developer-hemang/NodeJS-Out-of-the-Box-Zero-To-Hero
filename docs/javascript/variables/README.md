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

🔶 var — Function Scoped (Legacy)

⚠️ Avoid in modern JavaScript

# ✅ Key Characteristics

- Function scoped  
- Hoisted and initialized with undefined  
- Can be re-declared  
- Can be reassigned  
- Not block scoped  

# 📌 Example — No Block Scope

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


# 🔼 Hoisting with var

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

# ❌ Re-declaration Allowed

```js
var a = 10;
var a = 20; // ✅ allowed
```