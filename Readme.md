
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
