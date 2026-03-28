# 1️⃣ What is Rate Limiting?

Example:

```js
100 requests per minute per user
```

If the user sends more than 100 requests, the server blocks the extra requests.

Example response:

```js 
{
  "message": "Too many requests, please try again later"
}

```

HTTP Status Code:

```js
429 Too Many Requests
```


# 2️⃣ Why Rate Limiting is Needed

## Without rate limiting, APIs can be abused or overloaded.

#### Problem Example 

Suppose you run a public API:

```js
/api/users
```

If someone sends:

```js
10,000 request per second
```

Your server could:

- crash
- become slow
- increase infrastructure cost
- deny service to real users

## Real-world scenarios

Rate Limiting protects against:

## 1️⃣ DDoS attacks:
 Attackers send massive traffic

## 2️⃣ Brute force attacks:

Example:

```js
/login
```

Attacker tries thousands of passwords.

## 3️⃣ API abuse

Example: 

```js
AI API

```

Users could generate millions of requests.

## 4️⃣ Fair usage

Ensure all users get equal access.


# Where Rate Limiting is Implemented ?

Rate Limiting can be applied at different levels. 


## 1️⃣ API Gateway

Example

```js
AWS API Gateway
NGINX
KONG
```

## 2️⃣ Backend Application

example 

```js
Node.js
Express Middleware
```

## 3️⃣ Backend Application

Example: 

```js
cloudflare
fastly
```

# 3️⃣ How Rate Limiting Works

Rate limiting tracks:

```js
IP Address
User ID
API key
```

And counts requests within a time window.

Example:

```js

User IP -> 192.168.1.10
Limit -> 100 requests
Window -> 1 minute
```

If requests exceed limit:

```js
Block request
Return 429
```

# 4️⃣ Rate Limiting Algorithms

This is a very common interview question.

There are sevral algorithms.

## 1️⃣ Fixed Window Algorithm.

Example: 

```js
Limit = 100 request per minute
```

Time window:

```js
10:00 - 10:01
```

If a user sends:

```js
100 requests → allowed
101 request → blocked
```


Problem:

User can send:

```js
100 requests at 10:00:59
100 requests at 10:01:00
```

Total: 

```js
200 requests in 2 seconds
```


## 2️⃣ Sliding Window Algorithm

Improves fixed window.

instead of resetting at fixed intervals, it calculates requests in a rolling time window.

Example:

```js
Last 60 seconds

```

More Accurate.

## 3️⃣ Token Bucket Algorithm

Used in high-performance systems.

Example: 

Bucket contains tokens.

```js
100 tokens
```

Each request consumes 1 token.

Tokens refill over time.

if bucket empty -> request rejected

## 4️⃣ Leaky Bucket Algorithm

Requests enter a queue and are processed at a fixed rate.

Example: 

```js
10 request per second
```
Excess requests are dropped.

# 5️⃣ Rate Limiting Strategies

### IP-based

```js
limit per IP
```

### User Based

```js
Limit Per logged in user
```

### API key based

```js
limit per api key
```

# 6️⃣ Rate Limiting in Node.js

Most common library:

```js
express-rate-limit
```

### install

```js
npm install express-rate-limit
```

```js

/**
 * Rate Limiting Examples using express-rate-limit
 *
 * This file demonstrates multiple rate limiting strategies:
 *
 * 1. Global IP Rate Limit
 * 2. Login Endpoint Rate Limit (Brute Force Protection)
 * 3. User-based Rate Limit (JWT authenticated users)
 * 4. API Key Rate Limit
 * 5. Email-based Rate Limit
 *
 * Install dependencies:
 * npm install express express-rate-limit jsonwebtoken
 */

import express from "express";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

/**
 * ---------------------------------------------
 * 1. GLOBAL RATE LIMIT (IP BASED)
 * ---------------------------------------------
 *
 * Default behaviour of express-rate-limit.
 * Limits requests per IP address.
 *
 * Example:
 * 100 requests per minute per IP
 */

const globalLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // max requests
  message: {
    error: "Too many requests from this IP. Please try again later."
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(globalLimiter);



/**
 * ---------------------------------------------
 * 2. LOGIN RATE LIMIT (BRUTE FORCE PROTECTION)
 * ---------------------------------------------
 *
 * Protects login endpoints from password attacks.
 *
 * Example:
 * 5 login attempts per 15 minutes
 */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: "Too many login attempts. Try again later."
  }
});

app.post("/login", loginLimiter, (req, res) => {
  res.json({ message: "Login endpoint" });
});



/**
 * ---------------------------------------------
 * 3. JWT AUTH MIDDLEWARE
 * ---------------------------------------------
 *
 * Example middleware to decode JWT
 */

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret");
    req.user = decoded;
  } catch (err) {}

  next();
};

app.use(authMiddleware);



/**
 * ---------------------------------------------
 * 4. USER BASED RATE LIMIT
 * ---------------------------------------------
 *
 * Rate limiting based on authenticated user ID.
 *
 * If user not logged in → fallback to IP.
 */

const userLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,

  keyGenerator: (req) => {
    return req.user?.id || req.ip;
  },

  message: {
    error: "Too many API requests for this user."
  }
});

app.get("/api/data", userLimiter, (req, res) => {
  res.json({ message: "User API accessed" });
});



/**
 * ---------------------------------------------
 * 5. API KEY RATE LIMIT
 * ---------------------------------------------
 *
 * Common for SaaS APIs.
 * Limit requests based on API key.
 *
 * Example header:
 * x-api-key: abc123
 */

const apiKeyLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,

  keyGenerator: (req) => {
    return req.headers["x-api-key"] || req.ip;
  },

  message: {
    error: "API key rate limit exceeded"
  }
});

app.get("/api/external", apiKeyLimiter, (req, res) => {
  res.json({ message: "External API accessed" });
});



/**
 * ---------------------------------------------
 * 6. EMAIL BASED RATE LIMIT
 * ---------------------------------------------
 *
 * Useful for:
 * - password reset
 * - OTP
 * - signup
 */

const emailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 3,

  keyGenerator: (req) => {
    return req.body.email || req.ip;
  },

  message: {
    error: "Too many requests for this email"
  }
});

app.post("/forgot-password", emailLimiter, (req, res) => {
  res.json({ message: "Password reset request sent" });
});



/**
 * ---------------------------------------------
 * 7. NORMAL ROUTE (NO EXTRA LIMIT)
 * ---------------------------------------------
 */

app.get("/", (req, res) => {
  res.send("Server running");
});



/**
 * ---------------------------------------------
 * START SERVER
 * ---------------------------------------------
 */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

```
