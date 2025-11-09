# User Signup Endpoint Documentation

## Endpoint
POST /user/signup

## Description
Registers a new user with the required fields and returns a token upon successful signup.

## Request Body
```json
{
  "fullname": {
    "firstname": "string (required)",
    "lastname": "string (optional)"
  },
  "email": "string (required, valid email)",
  "password": "string (required, at least 6 characters)"
}
```

## Response
- **201 Created**: Successfully registers the user and returns the user object along with an authentication token.
- **400 Bad Request**: Returns validation errors if the request data is incorrect.

## Example 
 
 -`user`(object):
   - `fullname`(object):
      -`firstname`(string)
      - `lastname`(string)
   - `email`(string): required, valid email
   -` password`(string) : required, at least 6 characters
 -`token`(string): JWT TOKEN

# User Login Endpoint Documentation

## Endpoint
POST /user/login

## Description
Logs in an existing user using their email and password and returns an authentication token upon successful login.

## Request Body
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, at least 6 characters)"
}
```

## Response
- **200 OK**: Returns the user object along with an authentication token.
- **400 Bad Request**: Returns validation errors if request data is incorrect.
- **401 Unauthorized**: Returned when the email or password is incorrect.

## Example

 -`user`(object):
   - `fullname`(object):
      -`firstname`(string)
      - `lastname`(string)
   - `email`(string): required, valid email
   -` password`(string) : required, at least 6 characters
 -`token`(string): JWT TOKEN


## User Profile Endpoint

### GET /users/profile
Retrieves the profile information of the currently authenticated user.

**Authentication Required:** Yes (JWT Token)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:**
- Status Code: 200
```json
{
    "success": true,
    "data": {
        "id": "string",
        "name": "string",
        "email": "string",
        "phone": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
    }
}
```

**Error Responses:**
- 401 Unauthorized
```json
{
    "success": false,
    "message": "Authentication required"
}
```
- 404 Not Found
```json
{
    "success": false,
    "message": "User not found"
}
```

## User Logout Endpoint

### POST /user/logout
Logs out the currently authenticated user by invalidating their token.

**Authentication Required:** Yes (JWT Token)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:**
- Status Code: 200
```json
{
    "success": true,
    "message": "Logged out successfully"
}
```

**Error Response:**
- 401 Unauthorized
```json
{
    "success": false,
    "message": "Authentication required"
}
```

# Captain Registration Endpoint Documentation

## Endpoint
POST /captain/register

## Description
Registers a new captain (driver) with their personal and vehicle details.

## Request Body
```json
{
  "fullname": {
    "firstname": "string (required, min 3 chars)",
    "lastname": "string (optional, min 3 chars)"
  },
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)",
  "vehicle": {
    "color": "string (required, min 3 chars)",
    "plate": "string (required, min 3 chars)",
    "capacity": "number (required)",
    "vehicleType": "string (required, enum: car|bike|auto)"
  }
}
```

## Response
- **201 Created**: Successfully registers the captain and returns the captain object.
- **400 Bad Request**: Returns validation errors if the request data is incorrect.

## Example Success Response
```json
{
  "success": true,
  "data": {
    "id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

## Example Error Response
```json
{
  "success": false,
  "errors": [
    {
      "field": "fullname.firstname",
      "message": "Firstname must have at least 3 characters"
    }
  ]
}
```

# Captain Login Endpoint Documentation

## Endpoint
POST /captain/login

## Description
Authenticates a captain using email and password, returns an authentication token upon successful login.

## Request Body
```json
{
  "email": "string (required, valid email)",
  "password": "string (required, min 6 chars)"
}
```

## Response
- **200 OK**: Returns the captain object and authentication token
- **401 Unauthorized**: Invalid credentials
- **400 Bad Request**: Validation errors

## Example Success Response
```json
{
  "token": "jwt_token_string",
  "captain": {
    "id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "string"
  }
}
```

# Captain Profile Endpoint

## Endpoint
GET /captain/profile

## Description
Retrieves the profile information of the currently authenticated captain.

**Authentication Required:** Yes (JWT Token)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:**
- Status Code: 200
```json
{
  "captain": {
    "id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "number",
      "vehicleType": "string"
    },
    "status": "string",
    "location": {
      "lat": "number",
      "lng": "number"
    }
  }
}
```

# Captain Logout Endpoint

## Endpoint
GET /captain/logout

## Description
Logs out the currently authenticated captain by invalidating their token.

**Authentication Required:** Yes (JWT Token)

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Success Response:**
- Status Code: 200
```json
{
  "message": "Logged out successfully"
}
```

**Error Responses:**
- 401 Unauthorized
```json
{
  "error": "No token provided"
}
```
- 500 Internal Server Error
```json
{
  "error": "Error message"
}
```
