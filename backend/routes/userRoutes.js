const { getUser, updateUser, updatePassword } = require('../controllers/UserController');
const userVerification = require("../middlewares/authentication");
const userRouter = require("express").Router();

userRouter.get('/user/details/:userId', getUser);
userRouter.put('/user/update/:userId', userVerification, updateUser);
userRouter.put('/user/updatepassword/:userId', userVerification, updatePassword);

module.exports = userRouter;
