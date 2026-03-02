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
code runs line by line and real values assigned.

# 🔍 Hoisting with var

### Example 

```js
    console.log(a);
    var a = 1311;
```

### whay Javascript sees internally

```js
    var a;
    console.log(a);
    var a = 1311;
```

### Output

```js
    undefined
```




