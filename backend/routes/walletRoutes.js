const{ getWallet, fundWallet } = require('../controllers/WalletController');
const userVerification = require("../middlewares/authentication");
const walletRouter = require("express").Router();
const { verifyToken, verifyUser } = require('../middlewares/authentication');

walletRouter.get('/balance/:userId', verifyToken, verifyUser, getWallet);
walletRouter.put('/fund/:userId',  verifyToken, verifyUser, fundWallet);

module.exports = walletRouter;