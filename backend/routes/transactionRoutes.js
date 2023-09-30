const { transferMoney, getTransactions } = require("../controllers/TransactionController");
const userVerification = require("../middlewares/authentication");
const transRouter = require("express").Router();

transRouter.post("/transfer", transferMoney);
transRouter.get("/transactions/:userId", getTransactions);

module.exports = transRouter;