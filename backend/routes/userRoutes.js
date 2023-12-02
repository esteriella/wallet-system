const { getUser, updateUser, verifyBVN, updatePassword } = require('../controllers/UserController');
const { verifyLogin, verifyUser } = require('../middlewares/authentication');
const userRouter = require("express").Router();

userRouter.get('/details/:userId', verifyLogin, verifyUser, getUser);
userRouter.put('/update/:userId', verifyLogin, verifyUser, updateUser);
userRouter.put('/verify-bvn/:userId', verifyLogin, verifyUser, verifyBVN);
userRouter.put('/updatepassword/:userId', verifyLogin, verifyUser, updatePassword);

module.exports = userRouter;
