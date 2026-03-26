# What is the Event Loop?


## 1️⃣ Simple Definition of Node.js Event Loop
Event Loop is the mechanism that allows Node.js to perform non-blocking asynchronous operations using a single thread. 

Event Loop continuously checks queues and executes tasks in the Call Stack when it becomes empty.
It helps Node.js handle thousands of concurrent requests without creating multiple threads.



> The Event Loop is a core mechanism in Node.js that continuously monitors the call stack and callback queues. When the call stack becomes empty, it moves callbacks from queues like timers, I/O, and microtasks into the stack for execution, enabling Node.js to perform non-blocking asynchronous operations using a single thread.


## 2️⃣ Big Picture: How Node.js Actually Works

Node.js internally uses:

- V8 Engine → Executes JavaScript
- Call Stack → Runs synchronous code
- libuv → Handles async operations
- Event Loop → Moves tasks from queues to Call Stack
- Queues → Store callbacks


Architecture:

```js
            ┌───────────────┐
            │   JS Code     │
            └──────┬────────┘
                   │
                   ▼
            ┌───────────────┐
            │  Call Stack   │
            └──────┬────────┘
                   │
      ┌────────────┴────────────┐
      ▼                         ▼
 Microtask Queue           Callback Queue
 (Promises)                (Timers, I/O)

                   ▲
                   │
              Event Loop
                   │
                   ▼
                libuv
        (Handles async tasks)

```


## 3️⃣ Core Components

The Call Stack executes synchronous JavaScript code.

```js
function a() {
  console.log("A");
}

function b() {
  a();
}

b();

```

Execution: 

```js

Call Stack

b()
a()
console.log("A")

```

Stack executes top → bottom.


### 2️⃣ libuv

Node.js uses libuv (C library) to handle:

- File system
- Network requests
- Timers
- DNS
- Thread pool operations

Since JavaScript is single threaded, heavy operations go to libuv thread pool.


Example:

```js
fs.readFile()
crypto
compression
DNS lookup

```

Thread pool size:

```js
Default = 4 threads
```

## 4️⃣ What is the Event Loop?

The Event Loop continuously checks:

1️⃣ Is Call Stack empty?

2️⃣ If yes → take task from queues

3️⃣ Push task into Call Stack


Pseudo flow:

```js
while(true){
   if(callStack is empty){
       move task from queue → callStack
   }
}

```

## 5️⃣ Queues in Node.js

Node.js has multiple queues.

### 1️⃣ Microtask Queue

Highest priority.

Contains:

-  Promise ```.then()```
-  ```process.nextTick()```
-  ```queueMicrotask()```


Example:

```js
Promise.resolve().then(() => console.log("Promise"));

```

### 2️⃣ Timer Queue

Contains:

```js

setTimeout()
setInterval()

```

Example:

```js
setTimeout(() => {
 console.log("Timer");
}, 0);
```

### 3️⃣ I/O Queue

Contains callbacks from:

```js
fs
http
network
database
```

Example:

```js
fs.readFile("file.txt", () => {
 console.log("File read");
});

```

### 4️⃣ Check Queue

Contains:

```js
setImmediate()
```

Example:

```js
setImmediate(() => {
 console.log("Immediate");
});

```

### 5️⃣ Close Queue

Handles:

```js
socket.on("close")
```

### 6️⃣ Event Loop Phases

Node.js Event Loop runs in phases.

```js

┌───────────────────┐
│   Timers          │
│ setTimeout        │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Pending Callbacks │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Idle / Prepare    │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Poll              │
│ (I/O callbacks)   │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Check             │
│ setImmediate      │
└─────────┬─────────┘
          ▼
┌───────────────────┐
│ Close Callbacks   │
└───────────────────┘

```


### 7️⃣ Microtask Queue Priority

Important rule:

### ⚡ Microtasks always run before the next event loop phase.

Priority order:

```js
process.nextTick()
Promise callbacks
Timers
I/O
setImmediate
Close callbacks

```

### 8️⃣ Example 1 (Basic Event Loop)

```js

console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");


```

Output:

```js
Start
End
Promise
Timer
```


Explanation:

Step 1 — Sync code

```js
Start
End

```

Step 2 — Microtask Queue

```js 
Promise
```

Step 3 — Timer Queue
```js
Timer
```


### 9️⃣ Example 2 (process.nextTick)

```js

console.log("Start");

setTimeout(() => console.log("Timer"), 0);

Promise.resolve().then(() => console.log("Promise"));

process.nextTick(() => console.log("Next Tick"));

console.log("End");

```

Output: 


```js
Start
End
Next Tick
Promise
Timer

```

Priority:

```js
process.nextTick
Promise
Timers
```

### 🔟 Example 3 (setImmediate vs setTimeout)

```js
setTimeout(() => {
  console.log("Timeout");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

```

Result may vary depending on environment.

But inside I/O:

```js
fs.readFile("file.txt", () => {

  setTimeout(() => console.log("Timeout"),0);

  setImmediate(() => console.log("Immediate"));

});

```

Output:

```js
Immediate
Timeout
```

Because Check phase runs before timers in this case.

### 1️⃣1️⃣ Example with File System (libuv)

```js
const fs = require("fs");

console.log("Start");

fs.readFile("file.txt", () => {
  console.log("File read");
});

setTimeout(() => {
  console.log("Timer");
},0);

console.log("End");

```

Possible output:

```js
Start
End
Timer
File read
```

Explanation:

1️⃣ Sync code runs  

2️⃣ Timer queue   

3️⃣ I/O callback   



## 1️⃣2️⃣ Thread Pool (libuv)

Operations using thread pool:

```js
fs.readFile
crypto
zlib
dns.lookup
```


Example:

```js
const crypto = require("crypto");

crypto.pbkdf2("pass","salt",100000,64,"sha512",()=>{
   console.log("Hash done");
});

```

This runs in libuv thread pool, not in main thread.


## 1️⃣3️⃣ Why Node.js is Fast

Node.js is fast because:

✅ Non-blocking I/O  

✅ Event driven architecture  

✅ Single thread with async callbacks  

✅ Uses OS efficiently  


Example:

Traditional server:

```js
Request → Thread → Block → Response
```


Node.js:

```js
Request → Event Loop → Async I/O → Callback
```


## 1️⃣4️⃣ Real World Example (API Server)

Example:

```js

app.get("/users", async (req,res)=>{

 const users = await db.getUsers();

 res.json(users);

});
```

Flow:

```js

Request → Event Loop
      → DB Query (libuv / network)
      → callback queue
      → response

```

Server can handle thousands of requests simultaneously.

## 1️⃣5️⃣ Visual Flow

```js

JS Code
   │
   ▼
Call Stack
   │
   ▼
Async Task (libuv)
   │
   ▼
Queue (Timer / IO / Microtask)
   │
   ▼
Event Loop
   │
   ▼
Call Stack
   │
   ▼
Execute Callback

```

## 1️⃣6️⃣ Interview Definition (Best Answer)

The Event Loop is a core mechanism in Node.js that continuously monitors the call stack and callback queues. When the call stack becomes empty, it moves callbacks from queues like timers, I/O, and microtasks into the stack for execution, enabling Node.js to perform non-blocking asynchronous operations using a single thread.



## 1️⃣7️⃣ Quick Summary

| Component       | Purpose                   |
| --------------- | ------------------------- |
| Call Stack      | Executes synchronous code |
| libuv           | Handles async operations  |
| Event Loop      | Moves tasks to stack      |
| Microtask Queue | Promises, nextTick        |
| Timer Queue     | setTimeout                |
| I/O Queue       | File/network callbacks    |
| Check Queue     | setImmediate              |



