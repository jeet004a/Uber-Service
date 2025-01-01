# Uber User Registration Endpoint

## Endpoint
`POST /user/register`

## Description
This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

## Request Body
The request body should be a JSON object containing the following fields:
- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    },
    "token": "jwt_token"
  }
  ```

### Error
- **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "User already present"
    }
    ```
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "FirstName must be atleast 3 character",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password Must be 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

# Uber User Login Endpoint

## Endpoint
`POST /user/login`

## Description
This endpoint is used to log in an existing user. It requires the user's email and password.

## Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

### Error
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password Must be 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

# Uber User Profile Endpoint

## Endpoint
`GET /user/profile`

## Description
This endpoint is used to retrieve the profile of the authenticated user.

## Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

### Error
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

# Uber User Logout Endpoint

## Endpoint
`GET /user/logout`

## Description
This endpoint is used to log out the authenticated user.

## Request Headers
- `Authorization` (string, required): The JWT token of the authenticated user.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Logged Out"
  }
  ```

### Error
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

# Uber Captain Registration Endpoint

## Endpoint
`POST /captain/register`

## Description
This endpoint is used to register a new captain. It requires the captain's first name, last name, email, password, and vehicle details.

## Request Body
The request body should be a JSON object containing the following fields:
- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the captain. Must be at least 3 characters long if provided.
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.
- `vehicle.color` (string, required): The color of the vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the vehicle. Must be at least 6 characters long.
- `vehicle.capacity` (number, required): The capacity of the vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the vehicle. Must be one of 'car', 'motorcycle', or 'auto'.

Example:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Responses

### Success
- **Status Code**: `201 Created`
- **Response Body**:
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    },
    "token": "jwt_token"
  }
  ```

### Error
- **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "message": "User already exist"
    }
    ```
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Firstname must be atleast 3 character long",
          "param": "fullname.firstname",
          "location": "body"
        },
        {
          "msg": "Password must be atleast 6 character long",
          "param": "password",
          "location": "body"
        },
        {
          "msg": "Vehicle color must be 3 caharacter long",
          "param": "vehicle.color",
          "location": "body"
        },
        {
          "msg": "Vehicle plate must be atleast 6 character long",
          "param": "vehicle.plate",
          "location": "body"
        },
        {
          "msg": "Vechile capacity must be atleast 1 character long",
          "param": "vehicle.capacity",
          "location": "body"
        },
        {
          "msg": "invalid vehicle type",
          "param": "vehicle.vehicleType",
          "location": "body"
        }
      ]
    }
    ```

# Uber Captain Login Endpoint

## Endpoint
`POST /captain/login`

## Description
This endpoint is used to log in an existing captain. It requires the captain's email and password.

## Request Body
The request body should be a JSON object containing the following fields:
- `email` (string, required): The email address of the captain. Must be a valid email format.
- `password` (string, required): The password for the captain. Must be at least 6 characters long.

Example:
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "token": "jwt_token",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

### Error
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid email",
          "param": "email",
          "location": "body"
        },
        {
          "msg": "Password Must be 6 character long",
          "param": "password",
          "location": "body"
        }
      ]
    }
    ```

# Uber Captain Profile Endpoint

## Endpoint
`GET /captain/profile`

## Description
This endpoint is used to retrieve the profile of the authenticated captain.

## Request Headers
- `Authorization` (string, required): The JWT token of the authenticated captain.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "_id": "captain_id",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
  ```

### Error
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

# Uber Captain Logout Endpoint

## Endpoint
`GET /captain/logout`

## Description
This endpoint is used to log out the authenticated captain.

## Request Headers
- `Authorization` (string, required): The JWT token of the authenticated captain.

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "message": "Logged Out"
  }
  ```

### Error
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```
