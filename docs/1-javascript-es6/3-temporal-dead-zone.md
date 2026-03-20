# Temporal Dead Zone (TDZ)

Temporal Dead Zone is a time between when a variable is declared and when it is initialized, during this time we can not use the variable even though it exists in memory. in short Temporal Dead Zone is the period where a let or const variable is in scope but not yet useable. if you try to access it → ❌ ReferenceError

# ⏱️ Why the name “Temporal”?

Because it’s about time (execution order), not position in the file.

## Example 

```js
console.log(a); // ❌ ReferenceError
let a = 20;
```

Let me explain above example step by step 

(1) JS sees ```let a```;  
(2) it reserves memory for ```a```  
(3) But does not give it a value yet  
(4) Until this line runs → ```let a = 10```  

### So the time before initialization = TDZ

# When TDZ Ends ?

```js
let a = 20;
console.log(a); // ✅ works
```

TDZ ends as soon as the variable gets its value.

### ```var``` has NO TDZ 

```js
    console.log(x);
    var x = 5;
```

Why? 
Because ```var``` is initialized with ```undefined``` during hoisting.

```let``` and ```const``` ✅ TDZ exists

```js
    console.log(x); // ❌ ReferenceError
    let x = 100;
```


# 🎯 Real-Life Analogy

Think of it like a hotel room:

- Room is booked in your name 🏨 (memory allocated)  
- But you cannot enter the room yet 🚫  
- Until check-in time (initialization)  

### That waiting time = TDZ


# 📌 Important Rules

✔ TDZ only for let and const  
✔ Starts when scope begins  
✔ Ends when value is assigned  
✔ Accessing variable in TDZ → ReferenceError  

# 🚀 Why TDZ Exists (Real Purpose)
It helps to:

✅ prevent using variables before declaration  
✅ catch bugs early  
✅ make code predictable  