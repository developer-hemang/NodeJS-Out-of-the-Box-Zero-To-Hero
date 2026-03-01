#  🔐 Javascript Scope 

In the  javascript Scope Means accessibility of the variables JavaScript Variables Has Three types of Scope:  
- Global Scope  
- Functional Scope  
- Block Scope  

## Global Scope 

Variables which are declared Globally outside any block or function have Global Scope , they can be accessed from anywhere in a javascript program.

Variables declared with var , let and const are quite similar when declared outside a block thay all have **Global Scope**   

```js
var name = "Hemang";  //Global Scope
let surname = "Dave";  // Global Scope
const y = 200 ;  // Global Scope
```

# 🤔 Example Global Scope

```js
var name = "Hemang Dave";

// we can use **name** variable  

function getName() {
    // we can here also use **name** variable 
}
```