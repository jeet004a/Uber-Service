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

# Uber Ride Creation Endpoint

## Endpoint
`POST /ride/create`

## Description
This endpoint is used to create a new ride. It requires the user's pickup location, destination, and vehicle type.

## Request Body
The request body should be a JSON object containing the following fields:
- `pickup` (string, required): The pickup location of the ride. Must be at least 3 characters long.
- `destination` (string, required): The destination location of the ride. Must be at least 3 characters long.
- `vehicleType` (string, required): The type of the vehicle. Must be one of 'auto', 'car', or 'moto'.

Example:
```json
{
  "pickup": "123 Main St",
  "destination": "456 Elm St",
  "vehicleType": "car"
}
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "ride": {
      "_id": "ride_id",
      "user": "user_id",
      "pickup": "123 Main St",
      "destination": "456 Elm St",
      "otp": "123456",
      "fare": 100
    }
  }
  ```

### Error
- **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Pickup Address",
          "param": "pickup",
          "location": "body"
        },
        {
          "msg": "Invalid Destination Address",
          "param": "destination",
          "location": "body"
        },
        {
          "msg": "Invalid Vehicle Type",
          "param": "vehicleType",
          "location": "body"
        }
      ]
    }
    ```
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```
- **Status Code**: `500 Internal Server Error`
  - **Response Body**:
    ```json
    {
      "message": "Unable to create ride"
    }
    ```

# Uber Ride Fare Calculation Endpoint

## Endpoint
`GET /ride/get-fare`

## Description
This endpoint is used to calculate the fare for a ride based on the pickup and destination locations.

## Request Query Parameters
- `pickup` (string, required): The pickup location of the ride. Must be at least 3 characters long.
- `destination` (string, required): The destination location of the ride. Must be at least 3 characters long.

Example:
```
GET /ride/get-fare?pickup=123+Main+St&destination=456+Elm+St
```

## Responses

### Success
- **Status Code**: `200 OK`
- **Response Body**:
  ```json
  {
    "auto": 50,
    "car": 100,
    "moto": 40
  }
  ```

### Error
- **Status Code**: `400 Bad Request`
  - **Response Body**:
    ```json
    {
      "errors": [
        {
          "msg": "Invalid Pickup Address",
          "param": "pickup",
          "location": "query"
        },
        {
          "msg": "Invalid Destination Address",
          "param": "destination",
          "location": "query"
        }
      ]
    }
    ```
- **Status Code**: `401 Unauthorized`
  - **Response Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```
- **Status Code**: `500 Internal Server Error`
  - **Response Body**:
    ```json
    {
      "message": "Unable to get fare"
    }
    ```
    # Uber Ride Confirmation Endpoint

    ## Endpoint
    `POST /ride/confirm`

    ## Description
    This endpoint is used by the captain to confirm a ride. It requires the ride ID.

    ## Request Body
    The request body should be a JSON object containing the following field:
    - `rideId` (string, required): The ID of the ride. Must be a valid MongoDB ObjectId.

    Example:
    ```json
    {
      "rideId": "ride_id"
    }
    ```

    ## Responses

    ### Success
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "ride": {
          "_id": "ride_id",
          "user": "user_id",
          "captain": "captain_id",
          "status": "accepted"
        }
      }
      ```

    ### Error
    - **Status Code**: `400 Bad Request`
      - **Response Body**:
        ```json
        {
          "errors": [
            {
              "msg": "Invalid ride id",
              "param": "rideId",
              "location": "body"
            }
          ]
        }
        ```
    - **Status Code**: `401 Unauthorized`
      - **Response Body**:
        ```json
        {
          "message": "Unauthorized"
        }
        ```
    - **Status Code**: `500 Internal Server Error`
      - **Response Body**:
        ```json
        {
          "message": "Unable to confirm ride"
        }
        ```

    # Uber Ride Start Endpoint

    ## Endpoint
    `GET /ride/start-ride`

    ## Description
    This endpoint is used by the captain to start a ride. It requires the ride ID and OTP.

    ## Request Query Parameters
    - `rideId` (string, required): The ID of the ride. Must be a valid MongoDB ObjectId.
    - `otp` (string, required): The OTP for the ride. Must be exactly 6 characters long.

    Example:
    ```
    GET /ride/start-ride?rideId=ride_id&otp=123456
    ```

    ## Responses

    ### Success
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "ride": {
          "_id": "ride_id",
          "user": "user_id",
          "captain": "captain_id",
          "status": "ongoing"
        }
      }
      ```

    ### Error
    - **Status Code**: `400 Bad Request`
      - **Response Body**:
        ```json
        {
          "errors": [
            {
              "msg": "Invalid ride id",
              "param": "rideId",
              "location": "query"
            },
            {
              "msg": "Invalid OTP",
              "param": "otp",
              "location": "query"
            }
          ]
        }
        ```
    - **Status Code**: `401 Unauthorized`
      - **Response Body**:
        ```json
        {
          "message": "Unauthorized"
        }
        ```
    - **Status Code**: `500 Internal Server Error`
      - **Response Body**:
        ```json
        {
          "message": "Unable to start ride"
        }
        ```

    # Uber Ride End Endpoint

    ## Endpoint
    `POST /ride/end-ride`

    ## Description
    This endpoint is used by the captain to end a ride. It requires the ride ID.

    ## Request Body
    The request body should be a JSON object containing the following field:
    - `rideId` (string, required): The ID of the ride. Must be a valid MongoDB ObjectId.

    Example:
    ```json
    {
      "rideId": "ride_id"
    }
    ```

    ## Responses

    ### Success
    - **Status Code**: `200 OK`
    - **Response Body**:
      ```json
      {
        "ride": {
          "_id": "ride_id",
          "user": "user_id",
          "captain": "captain_id",
          "status": "completed"
        }
      }
      ```

    ### Error
    - **Status Code**: `400 Bad Request`
      - **Response Body**:
        ```json
        {
          "errors": [
            {
              "msg": "Invalid ride id",
              "param": "rideId",
              "location": "body"
            }
          ]
        }
        ```
    - **Status Code**: `401 Unauthorized`
      - **Response Body**:
        ```json
        {
          "message": "Unauthorized"
        }
        ```
    - **Status Code**: `500 Internal Server Error`
      - **Response Body**:
        ```json
        {
          "message": "Unable to end ride"
        }
        ```

        # Uber Map Coordinates Endpoint

        ## Endpoint
        `GET /map/get-coordinates`

        ## Description
        This endpoint is used to get the coordinates (latitude and longitude) of a given address.

        ## Request Query Parameters
        - `address` (string, required): The address to get coordinates for. Must be at least 3 characters long.

        Example:
        ```
        GET /map/get-coordinates?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA
        ```

        ## Responses

        ### Success
        - **Status Code**: `200 OK`
        - **Response Body**:
          ```json
          {
            "ltd": 37.4224764,
            "lng": -122.0842499
          }
          ```

        ### Error
        - **Status Code**: `400 Bad Request`
          - **Response Body**:
            ```json
            {
              "errors": [
                {
                  "msg": "Invalid address",
                  "param": "address",
                  "location": "query"
                }
              ]
            }
            ```
        - **Status Code**: `500 Internal Server Error`
          - **Response Body**:
            ```json
            {
              "message": "Unable to fetch coordinates"
            }
            ```

        # Uber Map Distance and Time Endpoint

        ## Endpoint
        `GET /map/get-distance-time`

        ## Description
        This endpoint is used to get the distance and estimated travel time between two locations.

        ## Request Query Parameters
        - `origin` (string, required): The starting location. Must be at least 3 characters long.
        - `destination` (string, required): The destination location. Must be at least 3 characters long.

        Example:
        ```
        GET /map/get-distance-time?origin=1600+Amphitheatre+Parkway,+Mountain+View,+CA&destination=1+Infinite+Loop,+Cupertino,+CA
        ```

        ## Responses

        ### Success
        - **Status Code**: `200 OK`
        - **Response Body**:
          ```json
          {
            "distance": {
              "text": "14.4 km",
              "value": 14400
            },
            "duration": {
              "text": "15 mins",
              "value": 900
            }
          }
          ```

        ### Error
        - **Status Code**: `400 Bad Request`
          - **Response Body**:
            ```json
            {
              "errors": [
                {
                  "msg": "Invalid origin",
                  "param": "origin",
                  "location": "query"
                },
                {
                  "msg": "Invalid destination",
                  "param": "destination",
                  "location": "query"
                }
              ]
            }
            ```
        - **Status Code**: `500 Internal Server Error`
          - **Response Body**:
            ```json
            {
              "message": "Unable to fetch distance and time"
            }
            ```

        # Uber Map AutoComplete Suggestions Endpoint

        ## Endpoint
        `GET /map/get-suggestions`

        ## Description
        This endpoint is used to get autocomplete suggestions for a given input.

        ## Request Query Parameters
        - `input` (string, required): The input text to get suggestions for. Must be at least 1 character long.

        Example:
        ```
        GET /map/get-suggestions?input=1600+Amphitheatre
        ```

        ## Responses

        ### Success
        - **Status Code**: `200 OK`
        - **Response Body**:
          ```json
          [
            {
              "description": "1600 Amphitheatre Parkway, Mountain View, CA, USA",
              "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
            },
            {
              "description": "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
              "place_id": "ChIJ2eUgeAK6j4ARbn5u_wAGqWA"
            }
          ]
          ```

        ### Error
        - **Status Code**: `400 Bad Request`
          - **Response Body**:
            ```json
            {
              "errors": [
                {
                  "msg": "Invalid input",
                  "param": "input",
                  "location": "query"
                }
              ]
            }
            ```
        - **Status Code**: `500 Internal Server Error`
          - **Response Body**:
            ```json
            {
              "message": "Unable to fetch suggestions"
            }
            ```