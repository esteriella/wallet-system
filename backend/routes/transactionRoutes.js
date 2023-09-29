const { transferMoney } = require("../controllers/TransactionController");
const userVerification = require("../middleware/authentication");
const router = require("express").Router();

router.post("/transfer", userVerification, transferMoney);

module.exports = router;