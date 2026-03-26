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