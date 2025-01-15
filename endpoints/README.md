# Supabase Cloud Functions

This repository contains Cloud Functions (λ) deployed on Supabase, with each function handling service management by providing a gateway to OneAuthX - A Third Party Authenticator. The functions are available in the directory `supabase/functions/`.

## Table of Contents

- [Available Functions](#table-of-contents)
  - [add-service](#add-service)
  - [check-service](#check-service)
  - [verify-otp](#verify-otp)
- [Endpoints](#endpoints)
- [JWT Verification](#jwt-verification)

## Available Functions

### add-service

**Purpose**:  
This function allows a user to register a new service associated with their OneAuthX account. The service is stored in the `Services` collection in Firestore.

**Endpoint**:  
`POST https://khbpumgtlccpgjkhhetq.supabase.co/functions/v1/add-service`

#### Request Body

```json
{
  "email": "string",        // User's email address
  "password": "string",     // User's password
  "service": "string"       // Name of the service to be added
}
```

#### Response

- **Success** (`200 OK`):

  ```json
  {
    "success": true,
    "timestamp": "<server-timestamp>"
  }
  ```

- **Failure** (`400 Bad Request` or `500 Internal Server Error`):

  ```json
  {
    "success": false,
    "timestamp": "<server-timestamp>"
  }
  ```

### check-service

**Purpose**:  
This function checks whether a specified service is associated with the user's account.

**Endpoint**:  
`POST https://khbpumgtlccpgjkhhetq.supabase.co/functions/v1/check-service`

#### Request Body

```json
{
  "email": "string",        // User's email address
  "password": "string",     // User's password
  "service": "string"       // Name of the service to be checked
}
```

#### Response

- **Service Found** (`200 OK`):

  ```json
  {
    "success": true
  }
  ```

- **Service Not Found** or **Failure** (`400 Bad Request` or `500 Internal Server Error`):

  ```json
  {
    "success": false,
    "timestamp": "<server-timestamp>"
  }
  ```

### verify-otp

**Purpose**:  
This function verifies a One-Time Password (OTP) for a specific service tied to a OneAuthX account to successfully authenticate the user within a 30s Time-Frame.

**Endpoint**:  
`POST https://khbpumgtlccpgjkhhetq.supabase.co/functions/v1/verify-otp`

#### Request Body

```json
{
  "email": "string",        // User's email address
  "password": "string",     // User's password
  "service": "string",      // Name of the service to verify
  "otp": "number"           // OTP to be verified
}
```

#### Response

- **OTP Verified** (`200 OK`):

  ```json
  {
    "verified": true,
    "timestamp": "<server-timestamp>"
  }
  ```

- **OTP Verification Failed** or **Failure** (`400 Bad Request` or `500 Internal Server Error`):

  ```json
  {
    "verified": false,
    "timestamp": "<server-timestamp>"
  }
  ```

## Endpoints

Below are the endpoints for the functions:

- **add-service**: `https://khbpumgtlccpgjkhhetq.supabase.co/functions/v1/add-service`
- **check-service**: `POST https://khbpumgtlccpgjkhhetq.supabase.co/functions/v1/check-service`
- **verify-otp**: `POST https://khbpumgtlccpgjkhhetq.supabase.co/functions/v1/verify-otp`

### JWT Verification

For these functions, JWT verification is disabled in `config.toml` with the following configuration:

```toml
[functions.add-service]
verify_jwt = false

[functions.check-service]
verify_jwt = false

[functions.verify-otp]
verify_jwt = false
```

This allows the functions to be accessed without requiring a JWT token.

## License
This project is licensed under the MIT License.

## Creator
This project is developed and maintained by <a href="https://github.com/xaman27x" target="_blank">Aman Morghade</a>.



