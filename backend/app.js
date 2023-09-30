require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const walletRouter = require("./routes/walletRoutes");
const transRouter = require("./routes/transactionRoutes");
const { MONGO_DB, PORT } = process.env;
const app = express();

mongoose.connect(MONGO_DB);
const database = mongoose.connection;
database.on("error", error => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
});
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://estie-wallet-system.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/wallet", walletRouter);
app.use("/api/transaction", transRouter);