require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const walletRouter = require("./routes/walletRoutes");
const transRouter = require("./routes/transactionRoutes");
const { errorHandler } = require('./middlewares/errors');
const { MONGO_DB, PORT } = process.env;
const app = express();

const APP_PORT = PORT || 8080;

mongoose.connect(MONGO_DB);
const database = mongoose.connection;
database.on("error", error => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});
app.listen(APP_PORT, () => {
  console.log(`Server is listening on port ${APP_PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://estie-wallet-system.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(errorHandler);
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/transaction", transRouter);