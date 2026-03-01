# 📦 JavaScript Variables — `var` vs `let` vs `const`

Understanding variables is **fundamental to mastering JavaScript**.  
This guide explains:

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

Each behaves differently.

🔶 var — Function Scoped (Legacy)

⚠️ Avoid in modern JavaScript

✅ Key Characteristics

Function scoped

Hoisted and initialized with undefined

Can be re-declared

Can be reassigned

Not block scoped

📌 Example — No Block Scope

function test() {
  var x = 10;

  if (true) {
    var x = 20;
    console.log(x); // 20
  }

  console.log(x); // 20 ❗ same variable
}