# Remove Duplicate Characters from a String

# 1️⃣ Understanding the Problem

### input

```js
hello
```

### Character frequency:

| Character | Count |
| --------- | ----- |
| h         | 1     |
| e         | 1     |
| l         | 2     |
| o         | 1     |


So:

```js
Unique characters → heo
Duplicate characters → ll
```

# 2️⃣ Best Approach (Using Hash Map / Object)

This is the most common interview solution.

### code 

```js
function separateDuplicates(str) {

    const map = {};
    let unique = "";
    let duplicate = "";

    // count characters
    for (let char of str) {
        map[char] = (map[char] || 0) + 1;
    }

    // separate them
    for (let char of str) {
        if (map[char] === 1) {
            unique += char;
        } else {
            duplicate += char;
        }
    }

    return {
        unique,
        duplicate
    };
}

console.log(separateDuplicates("hello"));

```

## Time Complexity

```js
O(n)
```

### We loop through the string twice.

## Space complexity:

```js
O(n)
```

