#  🔐 Javascript Scope 

In the  javascript Scope Means accessibility of the variables JavaScript Variables Has Three types of Scope:  
- Global Scope  
- Functional Scope  
- Block Scope  

# 🌐 Global Scope 

Variables which are declared Globally outside any block or function have Global Scope , they can be accessed from anywhere in a javascript program.

Variables declared with var , let and const are quite similar when declared outside a block thay all have **Global Scope**   

```js
var name = "Hemang";  //Global Scope
let surname = "Dave";  // Global Scope
const y = 200 ;  // Global Scope
```

## 🤔 Example Global Scope

```js
var name = "Hemang Dave";

// we can use name variable  

function getName() {
    //  we can here also use name variable 
}
```

# 📦 Function Scope

Each Javascript function have their own scope.  
Variables define inside a function are not accessible from outside the function.  
Variables declared with var, let and const are almost similar when declared inside function.  
They all have **Function Scope**  

```js

    function varOne() {
        var colorName = "RED"; // Function Scope
    }

    function varTwo() {
        var colorNAme = "GREEN"; // Function Scope
    }

    function varThree() {
        var colorName = "Blue"; // Function Scope
    }

```

## 🤔 Example Function Scope

```js

    // we can not use colorName variable here as it is declare inside a function

    function colorName() {
        let colorName = "Pitch";

        // we can use colorName variable here only
    }

    // we can not use colorName Variable here 
```


# {} Block Scope 

Javascript ES6 intruduced two new very important keywords which are let and const, these two keywords provide **Block Scope** in Javascript , before ES6 there are only two scope available **Global Scope** And **Function Scope**  

> Variables which are declared with let or const inside a code block {} are **Block scoped**  meaning they are only accessible within that block  

> why we need Block Scope ? basically Block Scope helps us to prevent any unintended overwrites and for better code organization  

## 🤔 Example Block Scope

```js
{
    let name = "Raja Babu";
}

// name can not be used here 
```

**Variables declared with the ```diff var ``` keyword can NOT have block scope.  
  Variables decalred with the ```diff var ``` keyword inside a block {} can be accessed from outside the block.
**


## 🤔 Example of var Block Scope (never do this)

```js
    {
        name = "my name is lakhan"
    }

    // name variable can be use here 
```



