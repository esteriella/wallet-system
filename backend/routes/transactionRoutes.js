const { transferMoney, getTransactions } = require("../controllers/TransactionController");
const userVerification = require("../middleware/authentication");
const router = require("express").Router();

router.post("/transfer", userVerification, transferMoney);
router.get("/transactions/:userId", userVerification, getTransactions);

module.exports = router;