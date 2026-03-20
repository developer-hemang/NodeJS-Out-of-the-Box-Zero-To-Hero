# Node.js + TypeScript + PostgreSQL + Prisma + Redis Setup  (Step by Step)

## 1️⃣ Prerequisites

Make sure these are installed

```js
node -v
npm -v
psql --version
```


Install if missing:

Node.js → https://nodejs.org

PostgreSQL → https://www.postgresql.org/download/

Check PostgreSQL login:

```js

psql -U postgres
```

## 2️⃣ Create Project

```js
mkdir node-prisma-api-with-typescript-redis
cd node-prisma-api-with-typescript-redis
```


## 3️⃣ Install Dependencies

Runtime dependencies

```js
npm install express prisma @prisma/client
```

Dev dependencies

```js
npm install -D typescript ts-node-dev @types/node @types/express
```

