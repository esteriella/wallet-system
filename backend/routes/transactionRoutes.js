const { transferMoney, getTransactions } = require("../controllers/TransactionController");
const userVerification = require("../middlewares/authentication");
const transRouter = require("express").Router();
const { verifyToken, verifyUser } = require('../middlewares/authentication');

transRouter.post("/transfer/:userId",  verifyToken, verifyUser, transferMoney);
transRouter.get("/history/:userId",  verifyToken, verifyUser, getTransactions);

module.exports = transRouter;