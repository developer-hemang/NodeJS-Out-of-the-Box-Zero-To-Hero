import express from 'express';
import fs from 'fs';
const app = express();


console.log("1 First Console");

setImmediate(() => {
    console.log("2 set Immediate");
})

setTimeout(() => {
    console.log("3 SetTImeout");
},0)

process.nextTick(() => {
    console.log("4 Process NextTick");
})


fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log("5 API Calling ",json))

Promise.resolve().then(() => {
    console.log("6 Promise resolved...");
})

fs.readFile("package.json","utf-8",(data) => {
    console.log("7 read file")
})


app.listen(5000,() => {
    console.log(`server is running on the ${5000} PORT`); 
})