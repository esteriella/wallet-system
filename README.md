# LUTA Backend Node.js Hackathon - Wallet System Project

I participated in the LUTA Backend Node.js Hackathon and successfully completed the assignment. I built a wallet system API using Node.js and Express, with MongoDB as the database, I also took a step further to create a frontend that can interact with the api Here's an overview of what I accomplished:

## Project Overview

### Models

I created three models for this project:

1. **Users:** This model stores user information, including their first name, last name, phone number, email, and password.

2. **Wallets:** The wallets model manages user wallets and includes details such as the associated user and the wallet balance.

3. **Transactions:** I implemented a transactions model to record financial transactions, including sender, recipient, amount, and transaction type (e.g., transfer or deposit).

### Endpoints

I designed and implemented several API endpoints to provide various wallet management features:

1. **Wallet Creation:** Users can create a new wallet.

2. **Wallet Update:** I provided functionality to update wallet details.

3. **Get Wallet Details:** Users can retrieve wallet information, including the current balance.

4. **Transfer Funds:** I implemented a secure way to transfer funds from one wallet to another, including validation to ensure the sender has sufficient funds.

5. **Get List of Transactions:** Users can fetch the list of transactions associated with their account.

6. **Authentication:** I ensured that authentication is implemented wherever necessary to secure access to specific endpoints.

## How to Use

To use my LUTA Backend Node.js Hackathon API, follow these steps:

1. Clone or download the project repository to your local machine.

2. Set up the required environment variables, such as database connection details and secret keys, in a `.env` file.

3. Install the project dependencies using `npm install`.

4. Start the Node.js server using `npm start`.

5. Access the API endpoints via the defined routes, typically on `http://localhost:your-port`.

## Technologies Used

I utilized several technologies to build this project:

- Node.js and Express: These were the primary technologies for building the API server.
- MongoDB: I used MongoDB as the database to store user data, wallet details, and transactions.
- JWT (JSON Web Tokens): JWTs were employed for authentication and authorization of users.
- Express Middleware: I used middleware to handle authentication and error handling.
- Mongoose: Mongoose served as an ODM (Object Data Modeling) library for MongoDB.

## Contributions

Contributions to this project are welcome! If you have suggestions, bug reports, or feature requests, please submit an issue or create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need assistance with the LUTA Backend Node.js Hackathon assignment, please feel free to reach out to me. Happy coding and wallet management with my LUTA Backend Node.js Hackathon API!