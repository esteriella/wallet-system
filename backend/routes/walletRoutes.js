const{ getWallet, fundWallet } = require('../controllers/WalletController');
const userVerification = require("../middlewares/authentication");
const walletRouter = require("express").Router();

walletRouter.get('/wallet/details/:userId', getWallet);
walletRouter.put('/wallet/fund/:userId', fundWallet);

module.exports = walletRouter;