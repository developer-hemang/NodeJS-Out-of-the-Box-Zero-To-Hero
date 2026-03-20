# 🔥 JavaScript Functions — Complete Guide (Node.js Interview Ready)  

Functions are the **core building blocks** of JavaScript.  
In Node.js, everything revolves around functions:

- Callbacks
- Middleware
- Closures
- Modules
- Event handlers
- Async operations

Understanding functions deeply is mandatory for backend interviews.

---

# 📌 What is a Function?

A function is a reusable block of code designed to perform a specific task.


```js
function greet() {
  console.log("Namashkaram Everyone...");
}
```

# 🟢 1️⃣ Function Declaration

```js
function functionName(parameters) {
  // logic
}

```

## Example

```js
function add(a, b) {
  return a + b;
}

console.log(add(5, 10)); // 15

```

## ✅ Hoisting Behavior

Function declarations are fully hoisted.

```js
sayHello(); // Works

function sayHello() {
  console.log("Hello");
}

```

## 🟡 2️⃣ Function Expression

Function stored inside a variable.

```js

const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(2, 3)); // 6

```

## ❗ Not Fully Hoisted

```js
multiply(2, 3); // ❌ Error

const multiply = function (a, b) {
  return a * b;
};

```

Only the variable is hoisted (not the function body).


# 🟢 3️⃣ Arrow Functions (ES6)

Shorter syntax and different ```this``` behavior.

```js

const subtract = (a, b) => {
  return a - b;
};

```

Short form:

```js
const square = x => x * x;

```


# ⚠️ Arrow Function vs Normal Function (Important Interview Topic)

## Difference in this  

### Normal Function

```js
const obj = {
  name: "Hemang",
  greet: function () {
    console.log(this.name);
  }
};

obj.greet(); // output ->  Hemang

```

### Arrow Function

```js

const obj = {
  name: "Hemang",
  greet: () => {
    console.log(this.name);
  }
};

obj.greet(); // undefined

```


Arrow functions do NOT have their own ```this```.

They inherit from parent scope (lexical ```this```).


# 🟢 4️⃣ Parameters vs Arguments

```js

function greet(name) { // parameter
  console.log("Hello", name);
}

greet("Hemang"); // argument

```


# 🟢 5️⃣ Default Parameters

```js

function greet(name = "Guest") {
  console.log("Hello", name);
}

greet(); // Hello Guest

```


# 🟢 6️⃣ Rest Parameters

Used when number of arguments is unknown.


```js 

function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

```




# 🟢 7️⃣ Callback Functions (Very Important for Node.js)

A function passed as an argument to another function.

```js

function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});

```


## 🧠 Real Node.js Example (fs module)

```js 
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

```

Node.js heavily uses callbacks.


# 🟢 8️⃣ Higher-Order Functions

A function that:  
- Takes another function as argument
- OR returns a function


```js 
function operate(a, b, operation) {
  return operation(a, b);
}

console.log(operate(5, 3, (x, y) => x + y)); // 8


```

# 🟢 9️⃣ Closures (Top Interview Question)

A closure is when a function remembers variables from its outer scope.

```js
function counter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const increment = counter();
increment(); // 1
increment(); // 2

```

Used in:
- Data privacy
- Middleware
- Factory functions


# 🟢 🔟 IIFE (Immediately Invoked Function Expression)

```js

(function () {
  console.log("Runs immediately");
})();

```

Used for:
- Private scope
- Avoid global pollution


# 🟢 1️⃣1️⃣ Async Functions (Node.js Critical)

```js 
async function fetchUser() {
  return "User Data";
}

fetchUser().then(console.log);

```

## With Await

```js
async function getData() {
  const result = await Promise.resolve("Hello");
  console.log(result);
}

```


# 🟢 1️⃣2️⃣ Pure vs Impure Functions

## Pure Function
```js 
function add(a, b) {
  return a + b;
}

```
No side effects.

## Pure Function

```js
let total = 0;

function addToTotal(value) {
  total += value;
}

```
Modifies external state.



# 🟢 1️⃣3️⃣ Function as Constructor

```js
function User(name) {
  this.name = name;
}

const u1 = new User("Hemang");
console.log(u1.name);

```

# 🟢 1️⃣4️⃣ Immediately Important for Node.js — Middleware Pattern

```js 

function logger(req, res, next) {
  console.log("Request received");
  next();
}

```
Express middleware is just functions.



# 🎯 Interview Important Differences

| Feature    | Function Declaration | Function Expression | Arrow Function |
| ---------- | -------------------- | ------------------- | -------------- |
| Hoisted    | ✅ Yes                | ❌ No                | ❌ No           |
| Own `this` | ✅ Yes                | ✅ Yes               | ❌ No           |
| Best for   | General logic        | Assignments         | Callbacks      |


# 🏆 Real Backend Example (Production Style)

```js

const createUser = (name) => {
  return {
    name,
    greet() {
      console.log(`Hello ${this.name}`);
    }
  };
};

const user = createUser("Hemang");
user.greet();

```
