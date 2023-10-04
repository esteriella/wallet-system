const{ getWallet, fundWallet } = require('../controllers/WalletController');
const userVerification = require("../middlewares/authentication");
const walletRouter = require("express").Router();
const { verifyLogin, verifyUser } = require('../middlewares/authentication');

walletRouter.get('/balance/:userId', verifyLogin, verifyUser, getWallet);
walletRouter.put('/fund/:userId',  verifyLogin, verifyUser, fundWallet);

module.exports = walletRouter;