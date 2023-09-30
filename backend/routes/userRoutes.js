const { getUser, updateUser, updatePassword } = require('../controllers/UserController');
const { verifyToken, verifyUser } = require('../middlewares/authentication');
const userRouter = require("express").Router();

userRouter.get('/details/:userId', verifyToken, verifyUser, getUser);
userRouter.patch('/update/:userId', verifyToken, verifyUser, updateUser);
userRouter.patch('/updatepassword/:userId', verifyToken, verifyUser, updatePassword);

module.exports = userRouter;
