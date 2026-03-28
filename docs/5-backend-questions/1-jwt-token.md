# 1️⃣ What is JWT (JSON Web Token)?

JWT is a stateless authentication mechanism where the server issues a token after login, and the client sends that token in every request to access protected resources. it is a compact, URL-safe token format used to securely transmit information between two parties. it is mainly used for authentication and authorization in modern APIs, microservices and Saas Applications.



# 2️⃣ Why Do We Need JWT?

Before JWT, applications used Session-based authentication.

### Traditional Session Flow

```js

User Login
   │
Server creates session
   │
Session stored in server memory / DB
   │
Client receives sessionId cookie
   │
Every request checks session store

```

### Problems ❌

- Server must store sessions
- Hard to scale in microservices
- Requires Redis / DB session store



### JWT Authentication Flow

```js
User Login
   │
Server verifies credentials
   │
Server creates JWT token
   │
Client stores token
   │
Client sends token in every request
   │
Server verifies token signature

```

### Advantages ✅

- Stateless
- scalable
- Works Well with Microservices
- No Session Storage Needed
- Faster


3️⃣ JWT Structure

A JWT token has 3 parts.

```js
HEADER.PAYLOAD.SIGNATURE
```

Example:

```js
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJ1c2VySWQiOiIxMjMiLCJyb2xlIjoiYWRtaW4ifQ
.
4Y9x1P4g7f9H3...

```
Each part is Base64URL encoded.

# JWT Header (Part 1)

The header describes the token type and signing algorithm.

Example:

```js
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Explanation:

| Field | Meaning                      |
| ----- | ---------------------------- |
| alg   | algorithm used to sign token |
| typ   | token type                   |


Common algorithms:

- HS256 → HMAC SHA256
- RS256 → RSA SHA256

# JWT Payload (Part 2)

The payload contains claims.

Claims are statements about the user or metadata.

Example payload:

```js

{
  "userId": "123",
  "email": "user@gmail.com",
  "role": "admin",
  "iat": 1719990000,
  "exp": 1719993600
}

```

Types of Claims

### 1. Registered Claims


Standard claims defined by JWT specification.

| Claim | Meaning    |
| ----- | ---------- |
| iss   | issuer     |
| sub   | subject    |
| aud   | audience   |
| exp   | expiration |
| nbf   | not before |
| iat   | issued at  |
| jti   | token id   |

Example 

{
 "sub": "123",
 "iat": 1719990000,
 "exp": 1719993600
}

### 2. Public Claims

Custom claims defined by the developer.

Example:

```js

{
 "userId": "123",
 "role": "admin"
}

```



### 3. Private Claims

Claims shared between services.

Example:

```js
{
 "tenantId": "company123"
}

```


## Important Security Rule

Never store sensitive data in JWT:

Do NOT store:

- passwords
- credit cards
- secrets

JWT payload is encoded, not encrypted.

Anyone can decode it.

# JWT Signature (Part 3)

The signature ensures token integrity.

It proves that the token was issued by the server and not modified.

Signature is created using:

```js

HMACSHA256(
 base64UrlEncode(header) + "." +
 base64UrlEncode(payload),
 secret
)

```

Example:

```js

encodedHeader + "." + encodedPayload

```

Then sign with secret key:

```js
signature = HMACSHA256(data, secret)

```


If someone modifies payload:

```js
role: "admin"
```

to

```js
role: "superadmin"
```

The Signature will no longer match.

The server will reject the token.

JWT contains an exp claim.

Example:

```js
{
 "userId": "123",
 "exp": 1719993600
}

```
exp is a Unix timestamp.

When verifying the token:

Server checks:

```js
current_time < exp
```

If expired:

```js
401 Unauthorized
```

Node.js example:

```js
jwt.sign(
 { id: user.id },
 process.env.JWT_SECRET,
 { expiresIn: "15m" }
);

```
Common expiration times:

Access token → 15 minutes
Refresh token → 7 days


# 7. Access Token vs Refresh Token

Modern authentication systems use two tokens.

### Access Token
Short-lived token used to access APIs.

Example lifetime:

```js
15 minutes
```

Example payload:

```js
{
 "userId": "123",
 "role": "user",
 "exp": 1719993600
}
```

Used in: 

```js
Authorization: Bearer ACCESS_TOKEN
```

### Refresh Token

Long-lived token used to get a new access token.

Example lifetime:

```js
7 days
```

Refresh token is stored securely.

Usually stored in:

```js
HttpOnly Cookie
```

# Access + Refresh Token Flow

### Login flow:

```js

User login
   │
Server verifies credentials
   │
Server generates:
   Access Token (15m)
   Refresh Token (7d)
   │
Client stores them

```


### When access token expires:

```js
Client → send refresh token
Server → verify refresh token
Server → issue new access token
```

### Flow diagram:

```js

Client
  │
Access Token (15m)
  │
API Request
  │
Expired
  │
Refresh Token
  │
Server creates new Access Token

```



# Production Ready JWT Example (NodeJS Express)

let's build a real Authentication System.

# 1️⃣ Project Structure:

```js

project
│
├── controllers
│   └── authController.js
│
├── middleware
│   └── authMiddleware.js
│
├── routes
│   └── authRoutes.js
│
├── utils
│   └── generateToken.js
│
├── server.js
└── .env

```

# 2️⃣ Install Required Packages

```js
npm install express jsonwebtoken bcrypt dotenv
```

# 3️⃣ .env file

```js

PORT=3000
JWT_SECRET=somesecrethere
JWT_EXPIRE=15min

```
# 4️⃣ Token Generator Utility

### utils/generateToken.js


```js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateToken = (user) => {

   return jwt.sign(
      {user.email,user.id}
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRE}
      
      );

}

```





# 5️⃣ Auth Controller

### controllers/authController.js

```js
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

const users = [];

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    email,
    password: hashedPassword
  };

  users.push(user);

  res.json({
    message: "User registered"
  });
};

export const login = async (req, res) => {

  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken(user.id);

  res.json({
    token
  });
};


```

# 6️⃣ JWT Middleware (Authentication)
### middleware/authMiddleware.js

```js
import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {

    res.status(401).json({
      message: "Invalid token"
    });

  }
};

```
# 7️⃣ Protected Route

### routes/authRoutes.js

```js

import express from "express";
import { login, register } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {

  res.json({
    message: "Protected route",
    user: req.user
  });

});

export default router;

```


# 8️⃣ server.js

```js

import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", authRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

```


# 9️⃣ Request Flow

### Login

```js
POST /api/login
```

### Response:

```js 
{
 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Access Protected Route

```js
GET /api/profile
```

### Header:

```js
Authorization: Bearer TOKEN
```

            
