# JavaScript Hositing - Complete Guide

## 📌 What is Hoisting?

Hoisting is Javasctipt's behavior of moving declarations to the top of their scope before code execution. in the simple words , even if you write code at the bottom Javascript process Declarations first.


## Why Hoisting Happens❓

Because before running your code , Javascript creates something called 👉 Execution Context, Execution happens in 2 phases:

## 1️⃣ Memory Creation Phase (Creation Phase)

Javascript Scans the code and :
- allocates memory for variables and functions  
- stores function definations  
- sets variables to default values

## 2️⃣ Execution Phase
- code runs line by line and real values assigned.

# 🔍 Hoisting with var

### Example 

```js
    console.log(a);
    var a = 1311;
```

### what Javascript sees internally

```js
    var a;
    console.log(a);
    var a = 1311;
```

### Output

```js
    undefined
```

### Why ❓
Because in memory phase:

```js
a = undefined
```


# Hoisting with let and const 

```js
    console.log(b);
    let b = 1995;
```

### output 

```js
    ReferenceError ❌
``` 

### Because 

-  ```let``` and ```const``` are hoisted but they are kept in ```Temporal Dead Zone (TDZ)```  
- They are not initialized with ```undefined```  
- They become usable only after the declaration line

# ƒ Function Hoisting

## ✅ Function Declaration (Fully Hoisted)

```js
sayHello();

function sayHello() {
  console.log("Hello");
}

```

### ✔ Works because:
During memory phase:

```js
sayHello = function() {...}

```

## ❌ Function Expression (NOT fully hoisted)

```js
sayHello();

var sayHello = function () {
  console.log("Hello");
};

```

## Output:

```js
TypeError: sayHello is not a function

```

## Why❓

Memory phase:

```js
var sayHello = undefined;
```

So you are calling:

```js
undefined();
```


# ⚡ Arrow Function Hoisting

```js
sayHello();

const sayHello = () => {
  console.log("Hello");
};

```

## Output:

```js
ReferenceError ❌
```

Because const is in TDZ.


# 📊 Summary Table

| Type                 | Hoisted | Initial Value         |
| -------------------- | ------- | --------------------- |
| var                  | ✅ yes   | `undefined`          |
| let                  | ✅ yes   | ❌ TDZ               |
| const                | ✅ yes   | ❌ TDZ               |
| function declaration | ✅ yes   | full function         |
| function expression  | ❌ no    | behaves like variable |



# 🔬 Real Execution Example

```js
var name = "hemang";

function getName(){
    var name;
    console.log(name);
    var name = "Dave";
}

getName();

```

### Output

```js
undefined
```

## Why ❓

### Inside function:

```js
var name;

console.log(name);

var name = "dave";
```

### Local variable shadows global one.

# 🧠 Hoisting in Global vs Function Scope

Hoisting happens:  
- inside global scope  
- inside every function separately  

Each scope has its own memory phase.

# 🎯 Most Asked Interview Question

## Question 

```js
console.log(a);
var a = 5;

console.log(b);
let b = 10;
```

## Answer

```js
undefined
ReferenceError
```


# 💡 Easy Real-Life Analogy

Think of JavaScript like a classroom teacher 👩‍🏫

Before teaching starts:

- She writes all student names in the register (memory phase)
- Later she assigns marks (execution phase)

But

- ```var``` students get default marks = undefined
- ```let/const``` students are marked “Do not access yet” (TDZ)


# 🚀 Why Hoisting is Important?

Because it helps you:

- ✅ understand execution order
- ✅ avoid bugs
- ✅ write predictable code
- ✅ crack interviews

🏁 Final One-Line Definition (Interview Ready)

> # Hoisting is JavaScript’s default behavior where variable and function declarations are moved to the top of their scope during the memory creation phase, before code execution.


