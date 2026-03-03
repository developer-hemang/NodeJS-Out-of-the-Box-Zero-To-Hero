# 🧠 What is this in JavaScript?

> ```this``` refers to the object that is currently executing the function.

But the tricky part is:

- ⚠️ ```this``` does NOT depend on where the function is written.
- ✅ It depends on how the function is called.

That’s the golden rule.

# 🔥 5 Important Rules of ```this``` (Interview Core)

## 1️⃣ this in Global Scope

In Browser:

```js
console.log(this);
```

👉 Output: ```window```

### Because in browsers, global object = window.

In Node.js:

```js
console.log(this);
```
👉 Output: {} (empty object)

### Because in Node.js, top-level this = module.exports

## 2️⃣ this inside a Regular Function

```js
function show() {
  console.log(this);
}

show();

```

In Browser:

👉 ```window```

In Node:

👉 ```global```

Because regular function default binding → global object.

⚠️ Strict Mode

```js
"use strict";

function show() {
  console.log(this);
}

show();
```

👉 Output: undefined

In strict mode, default binding becomes ```undefined```.


## 3️⃣ this inside an Object Method

```js
const user = {
  name: "Hemang",
  greet() {
    console.log(this.name);
  }
};

user.greet();

```

👉 Output:

```js
Hemang
```

Because ```this``` refers to the object before the dot.

Rule:

> When a function is called using dot notation, ```this``` refers to that object.

## 4️⃣ this in Arrow Functions (Very Important)

Arrow functions DO NOT have their own ```this```.

They inherit ```this``` from their surrounding scope (lexical ```this```).


Example:

```js

const user = {
  name: "Hemang",
  greet: () => {
    console.log(this.name);
  }
};

user.greet();

```

👉 Output:

```js
undefined

```
Because arrow function takes ```this``` from global scope.

Correct Way:

```js 

const user = {
  name: "Hemang",
  greet() {
    const arrow = () => {
      console.log(this.name);
    };
    arrow();
  }
};

user.greet();

```

👉 Output:

```js
Hemang
```

Because arrow inherits this from greet() method.