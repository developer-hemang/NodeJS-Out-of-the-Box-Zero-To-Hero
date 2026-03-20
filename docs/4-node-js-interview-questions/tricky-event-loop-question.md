```js 
function runIt(){
    setTimeout(() => {
        console.log("hello")
    })

    console.log("world");
}

runIt();

```

### currunt Output 

```js
world
hello
```

>Because setTimeout is asynchronous and its callback goes to the Event Loop (macro task queue), while console.log("world") runs synchronously.

Write a JavaScript program where the following code currently prints ```world hello```. Modify the implementation so that the output becomes ```hello world```.

Constraints:

- You cannot move hello outside the setTimeout.
- You cannot wrap world inside a setTimeout.
- You must keep the existing structure as much as possible.

# ✅ Solution (Using async/await + Promise)

```js

function delay() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("hello");
            resolve();
        });
    });
}

async function runIt(){
    await delay();
    console.log("world");
}

runIt();

```


Output:

```js
hello
world
```

# 📊 Event Loop Flow

```js
Call Stack
runIt()

await delay()
↓
setTimeout scheduled
↓
Event Loop waits
↓
hello printed
↓
Promise resolved
↓
world printed

```