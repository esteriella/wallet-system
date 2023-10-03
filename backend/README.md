# API Documentation

This document provides an overview of the endpoints and functionalities of the Estie Wallet System API.

## Controllers

### AuthController

#### Signup

- **Route:** `/api/auth/signup`
- **Method:** POST
- **Description:** Creates a new user and their associated wallet.
- **Request Body:**
  - `firstName` (string): First name of the user.
  - `lastName` (string): Last name of the user.
  - `phone` (string): Phone number of the user.
  - `email` (string): Email address of the user.
  - `password` (string): Password for the user's account.
- **Response:**
  - `message` (string): Success message.
  - `success` (boolean): Indicates if the operation was successful.

#### Signin

- **Route:** `/api/auth/signin`
- **Method:** POST
- **Description:** Signs in a user and returns an authentication token.
- **Request Body:**
  - `email` (string): Email address of the user.
  - `password` (string): Password for the user's account.
- **Response:**
  - `message` (string): Success message.
  - `success` (boolean): Indicates if the operation was successful.
  - `userId` (string): ID of the signed-in user.
  - `token` (string): Authentication token.

### TransactionController

#### Transfer Money

- **Route:** `/api/transaction/transfer/:userId`
- **Method:** POST
- **Description:** Transfers money from one user's wallet to another.
- **Request Parameters:**
  - `userId` (string): ID of the sending user.
- **Request Body:**
  - `to` (string): ID of the receiving user.
  - `amount` (number): Amount to transfer.
- **Response:**
  - `message` (string): Success message.
  - `success` (boolean): Indicates if the operation was successful.

#### Get Transactions

- **Route:** `/api/transaction/history/:userId`
- **Method:** GET
- **Description:** Retrieves transaction history for a user.
- **Request Parameters:**
  - `userId` (string): ID of the user.
- **Response:**
  - List of transactions.

### UserController

#### Get User Details

- **Route:** `/api/user/details/:userId`
- **Method:** GET
- **Description:** Retrieves user details by ID.
- **Request Parameters:**
  - `userId` (string): ID of the user.
- **Response:**
  - User details.

#### Update User Profile

- **Route:** `/api/user/update/:userId`
- **Method:** PUT
- **Description:** Updates user profile information.
- **Request Parameters:**
  - `userId` (string): ID of the user.
- **Request Body:**
  - `firstName` (string): Updated first name.
  - `lastName` (string): Updated last name.
  - `email` (string): Updated email address.
- **Response:**
  - `message` (string): Success message.
  - `success` (boolean): Indicates if the operation was successful.
  - Updated user profile.

#### Update Password

- **Route:** `/api/user/updatepassword/:userId`
- **Method:** PUT
- **Description:** Updates user's password.
- **Request Parameters:**
  - `userId` (string): ID of the user.
- **Request Body:**
  - `oldPassword` (string): Current password.
  - `newPassword` (string): New password.
- **Response:**
  - `message` (string): Success message.
  - `success` (boolean): Indicates if the operation was successful.

### WalletController

#### Get Wallet Balance

- **Route:** `/api/wallet/balance/:userId`
- **Method:** GET
- **Description:** Retrieves the wallet balance of a user.
- **Request Parameters:**
  - `userId` (string): ID of the user.
- **Response:**
  - `balance` (number): Wallet balance.

#### Fund Wallet

- **Route:** `/api/wallet/fund/:userId`
- **Method:** PUT
- **Description:** Adds funds to a user's wallet.
- **Request Parameters:**
  - `userId` (string): ID of the user.
- **Request Body:**
  - `amount` (number): Amount to add to the wallet.
- **Response:**
  - `message` (string): Success message.
  - `success` (boolean): Indicates if the operation was successful.
  - Updated wallet balance.

## Middleware

### Authentication Middleware

- **Middleware Name:** `verifyToken`
- **Description:** Verifies the authentication token provided in the request header or cookies.

- **Middleware Name:** `verifyLogin`
- **Description:** Verifies if a user is logged in based on the authentication token.

- **Middleware Name:** `verifyUser`
- **Description:** Verifies if the authenticated user matches the requested user's ID.

## Routes

- **Auth Routes:** `/api/auth/signup` and `/api/auth/signin`

- **Transaction Routes:** `/api/transaction/transfer/:userId` and `/api/transaction/history/:userId`

- **User Routes:** `/api/user/details/:userId`, `/api/user/update/:userId`, and `/api/user/updatepassword/:userId`

- **Wallet Routes:** `/api/wallet/balance/:userId` and `/api/wallet/fund/:userId`

Please make sure to include the necessary request parameters and body data as mentioned in the documentation for each route. Ensure that authentication tokens are provided in the request headers or cookies when required.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/esteriella/wallet-system/blob/main/LICENSE) file for details.

## Contact

If you have any questions or need assistance, you can reach me at [Opeyemi Esther Agbaje](https://github.com/esteriella).
