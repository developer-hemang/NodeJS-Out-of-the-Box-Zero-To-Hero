# What Are Streams

in nodejs streams are collections of data , which might not be available full at once and don't have to fit in memory 

Node.js Streams allow you to read or write data piece-by-piece (chunks) instead of loading the entire data into memory at once.

Think of it like drinking water through a straw instead of pouring the whole bottle into your mouth.

## Example:

```js
1GB File
```

### Without streams:

```js
Load entire 1GB into RAM
```

With streams:

```js
Read 64KB → process → next 64KB → process
```
So memory usage stays very small.


# 2️⃣ Why Streams Are Important

Without streams:

```js
fs.readFile("bigfile.txt")
```

Node loads the entire file into memory.

Problem:

```js
10GB file → 10GB RAM needed
```

With streams:

```js
File → chunk → chunk → chunk
```

Memory usage stays around 64KB – 1MB.


# 3️⃣ Real Life Example

Imagine downloading a movie from Netflix.

Netflix does not send the entire movie file at once.

Instead:

```js
Video Stream
↓
Chunk
↓
Chunk
↓
Chunk
```

This is exactly how Node.js Streams work.

# 4️⃣ Types of Streams in Node.js

Node.js has 4 types of streams.

| Type      | Description                 |
| --------- | --------------------------- |
| Readable  | Read data                   |
| Writable  | Write data                  |
| Duplex    | Read + Write                |
| Transform | Modify data while streaming |


# 5️⃣ Readable Stream Example

Readable stream is used to read data from a source.

Example: reading a large file.

```js

import fs from "fs";

const stream = fs.createReadStream("bigfile.txt", {
  encoding: "utf8"
});

stream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.length);
});

stream.on("end", () => {
  console.log("Finished reading file");
});

stream.on("error", (err) => {
  console.error(err);
});

```
Flow:
```js
File
 ↓
Readable Stream
 ↓
data event (chunks)
 ↓
end event

```
Output example:

```js
Received chunk: 65536
Received chunk: 65536
Received chunk: 65536
Finished reading file

```

Each chunk ≈ 64KB.


