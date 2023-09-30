const { transferMoney, getTransactions } = require("../controllers/TransactionController");
const userVerification = require("../middlewares/authentication");
const transRouter = require("express").Router();

transRouter.post("/transfer", userVerification, transferMoney);
transRouter.get("/transactions/:userId", userVerification, getTransactions);

module.exports = transRouter;