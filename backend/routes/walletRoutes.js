const{ getWallet, fundWallet } = require('../controllers/WalletController');
const userVerification = require("../middleware/authentication");
const router = require("express").Router();

router.get('/wallet/details/:userId', userVerification, getWallet);
router.put('/wallet/fund/:userId', userVerification, fundWallet);

module.exports = router;