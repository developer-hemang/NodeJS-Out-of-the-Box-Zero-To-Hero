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


# 8. JWT Implementation in Node.js

Install libraries:

```js
npm install express jsonwebtoken bcrypt dotenv
```

## Token Generator
            