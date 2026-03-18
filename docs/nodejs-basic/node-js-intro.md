# What Is NodeJs ?

Node.js is a free, open-source JavaScript runtime environment that allows developers to run JavaScript outside the browser, primarily for server-side development.


Node JS is build on Google Chrome's V8 javascript Engine,which compile javascript directly into highly optimised machine code, making execution fast and efficient. 

Node Js Uses a non-blocking , event-driven architecture, which allows it to handle thousands of concurrent connections efficiently. This makes nodejs especially suitable for I/O-intensive applications such as APIs, real-time systems , streaming services and microservices. 


# Common use cases include:

- REST API
- Real-time applications (chat, notifications)
- Streaming Services
- Microservices architecture
- Server-side web Application


# What is Non Blocking means in NodeJS ? 

A Non Blocking operation means that NodeJS does not wait for a task to finish before moving to the next task, insted, it delegates the tasks like file reading or database query to the system and continues executing other code. 

when the task is completed a **```callback```**  / **```promise```** / **```event```** notifies NodeJS

This allows NodeJS to Handle many Request simultaneously without waiting.


## Example OF Blocking & Non Blocking 


### Blocking Example (Synchronous)

```js
const fs = require('fs');
const data = fs.readFileSync('data.txt','utf-8');

console.log(data);
console.log("Program finished.");

```


Execution Flow 

```js

(1) Read file
(2) wait untill file is completely read
(3) print file data
(4) print "Program finished."

```

if the file takes 5 seconds the program waits 5 seconds 

### ❌ Problem: Other requests cannot be processed during this time.

### Non-Blocking Example (Asynchronous)

```js
const fs = require('fs');


fs.readfile('data.txt',"utf-8",(err,data) => {

    if (err) throw err;

    console.log(data);

})

console.log("Program finished");

```
Execution Flow

```js

1 Start reading file

2 Node delegates task to OS / libuv

3 Continue executing next code

4 Print "Program finished"

5 When file read completes → callback executes

6 Print file data

```

output

```js

Program finished
(file data)

```


# What is Event-Driven Architecture?

Definition

In an event-driven architecture, the program flow is determined by events such as:

- user requests
- file read completion
- database response
- timer completion
- network response

When an event happens, Node.js triggers a callback function (event handler).


## Example of Event-Driven Programming

```js
const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("orderPlaced", (order) => {
  console.log("Order received:", order);
});

emitter.emit("orderPlaced", { id: 101, product: "Laptop" });

```

Output 

```js
Order received: { id: 101, product: 'Laptop' }
```

Flow 

```js
Event Registered → orderPlaced
Event Triggered → emit()
Handler Executes → callback runs

```