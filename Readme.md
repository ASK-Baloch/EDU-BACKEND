
# EDUCARD

This repository contains Backend code For Educard. 
# Authentication APIs
- **Send OTP**
- **Verify OTP**
## Features
1. OTP-based user authentication.
2. Secure endpoints using JSON headers.
3. Built using Node.js and Express.js.

## API Documentation

### 1. **Send OTP**
- **Route**: `http://localhost:3000/api/auth/send-otp`
- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email"    : "user@example.com",
    "password" :"1234"
  }
  ```
- **Description**:
  This endpoint generates a 6-digit OTP and sends it to the provided email address. The OTP is valid for 10 minutes.
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "OTP sent successfully to user@example.com"
    }
    ```
  - **Error (400)**:
    ```json
    {
      "error": "Failed to send OTP: [Error message]"
    }
    ```

### 2. **Verify OTP**
- **Route**: `http://localhost:3000/api/auth/verify-otp`
- **Method**: POST
- **Headers**:
  - `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```
- **Description**:
  This endpoint verifies the OTP entered by the user. If the OTP matches and is still valid, the user is authenticated.
- **Response**:
  - **Success (200)**:
    ```json
    {
      "message": "User authenticated successfully"
    }
    ```
  - **Error (400)**:
    ```json
    {
      "error": "Invalid or expired OTP"
    }
    ```
Here's a well-documented guide for all the school-related APIs formatted for inclusion in your `README.md` file.

---

# School Management APIs

The following endpoints manage school registration, status updates, and listings. All APIs require authorization, and are restricted to `SuperAdmin` roles.

---

## **1. Register a New School**

### **Endpoint**  
`POST /api/schools`

### **Authorization**  
- **Role Required**: `SuperAdmin`

### **Headers**  
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

### **Request Body**  
```json
{
  "name": "Greenfield School",
  "address": "123 Main St",
  "email": "greenfield@example.com",
  "password": "strongpassword123",
  "contactNumber": "1234567890",
  "principalName": "John Doe"
}
```

### **Response**  
#### **201 Created**  
```json
{
  "message": "School registered successfully.",
  "school": {
    "_id": "64f8c1d9a2b7b12345678901",
    "name": "Greenfield School",
    "address": "123 Main St",
    "email": "greenfield@example.com",
    "password": "<hashed_password>",
    "contactNumber": "1234567890",
    "principalName": "John Doe",
    "isActive": false,
    "createdAt": "2024-12-21T10:00:00.000Z",
    "updatedAt": "2024-12-21T10:00:00.000Z"
  }
}
```

#### **400 Bad Request**  
```json
{
  "message": "Validation error: missing required fields."
}
```

---

## **2. Get All Registered Schools**

### **Endpoint**  
`GET /api/schools`

### **Authorization**  
- **Role Required**: `SuperAdmin`

### **Headers**  
```json
{
  "Authorization": "Bearer <token>"
}
```

### **Response**  
#### **200 OK**  
```json
{
  "message": "Schools retrieved successfully.",
  "schools": [
    {
      "_id": "64f8c1d9a2b7b12345678901",
      "name": "Greenfield School",
      "address": "123 Main St",
      "email": "greenfield@example.com",
      "contactNumber": "1234567890",
      "principalName": "John Doe",
      "isActive": false
    },
    {
      "_id": "64f8c2d9a2b7b12345678902",
      "name": "Bluefield School",
      "address": "456 Elm St",
      "email": "bluefield@example.com",
      "contactNumber": "9876543210",
      "principalName": "Jane Smith",
      "isActive": true
    }
  ]
}
```

---

## **3. Update School Status**

### **Endpoint**  
`PUT /api/schools/:id/status`

### **Authorization**  
- **Role Required**: `SuperAdmin`

### **Headers**  
```json
{
  "Authorization": "Bearer <token>",
  "Content-Type": "application/json"
}
```

### **Request Parameters**  
| Parameter | Type   | Description      |
|-----------|--------|------------------|
| `id`      | String | School's ObjectId |

### **Request Body**  
```json
{
  "isActive": true
}
```

### **Response**  
#### **200 OK**  
```json
{
  "message": "School status updated successfully.",
  "school": {
    "_id": "64f8c1d9a2b7b12345678901",
    "name": "Greenfield School",
    "isActive": true,
    "updatedAt": "2024-12-21T11:00:00.000Z"
  }
}
```

#### **404 Not Found**  
```json
{
  "message": "School not found."
}
```

---

## **4. Get All Active Schools**

### **Endpoint**  
`GET /api/schools/active`

### **Authorization**  
- **Role Required**: `SuperAdmin`

### **Headers**  
```json
{
  "Authorization": "Bearer <token>"
}
```

### **Response**  
#### **200 OK**  
```json
{
  "message": "Active schools retrieved successfully.",
  "schools": [
    {
      "_id": "64f8c2d9a2b7b12345678902",
      "name": "Bluefield School",
      "address": "456 Elm St",
      "email": "bluefield@example.com",
      "contactNumber": "9876543210",
      "principalName": "Jane Smith",
      "isActive": true
    }
  ]
}
```

---

## **5. Get All Inactive Schools**

### **Endpoint**  
`GET /api/schools/inactive`

### **Authorization**  
- **Role Required**: `SuperAdmin`

### **Headers**  
```json
{
  "Authorization": "Bearer <token>"
}
```

### **Response**  
#### **200 OK**  
```json
{
  "message": "Inactive schools retrieved successfully.",
  "schools": [
    {
      "_id": "64f8c1d9a2b7b12345678901",
      "name": "Greenfield School",
      "address": "123 Main St",
      "email": "greenfield@example.com",
      "contactNumber": "1234567890",
      "principalName": "John Doe",
      "isActive": false
    }
  ]
}
```

---

## **Error Responses**

### **401 Unauthorized**  
```json
{
  "message": "Access denied."
}
```

### **500 Internal Server Error**  
```json
{
  "message": "An error occurred: <error details>"
}
```

---

### Notes:
1. All APIs enforce strict role-based access control. Only users with the `SuperAdmin` role can interact with these endpoints.
2. Ensure to replace `<token>` with a valid JWT for testing the APIs.
3. Use tools like Postman or cURL to test these APIs efficiently.

## Prerequisites

- Node.js (v14 or above)
- npm or yarn
- MongoDB database
- `.env` file with the following variables:
  ```env
  EMAIL_USER=your_email@gmail.com
  EMAIL_PASS=your_email_password
  JWT_SECRET=your_secret_key
  MONGO_URL=your_mongodb_connection_string
  ```

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/EDU-BACKEND.git
   cd EDU-BACKEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the required variables.
4. Start the server:
   ```bash
   npm start
   ```
   
## Technologies Used
- **Node.js**: Runtime environment for server-side JavaScript.
- **Express.js**: Web framework for building RESTful APIs.
- **Nodemailer**: Library for sending emails.
- **MongoDB**: NoSQL database for storing user and OTP data.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

---

Feel free to reach out with any questions or feedback!
