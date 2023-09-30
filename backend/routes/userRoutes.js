const { getUser, updateUser, updatePassword } = require('../controllers/UserController');
const { verifyToken, verifyUser } = require('../middlewares/authentication');
const userRouter = require("express").Router();

userRouter.get('/user/details/:userId', verifyToken, verifyUser, getUser);
userRouter.patch('/user/update/:userId', verifyToken, verifyUser, updateUser);
userRouter.patch('/user/updatepassword/:userId', verifyToken, verifyUser, updatePassword);

module.exports = userRouter;
