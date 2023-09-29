require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const walletRoute = require("./routes/walletRoutes");
const transactionRoute = require("./routes/transactionRoutes");
const { errorHandler } = require('./middleware/errorHandler');
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

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(errorHandler);
app.use("/api/", authRoute);
app.use("/api/", userRoute);
app.use("/api/", walletRoute);
app.use("/api/", transactionRoute);