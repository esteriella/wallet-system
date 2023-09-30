const { getUser, updateUser, updatePassword } = require('../controllers/UserController');
const { verifyToken, verifyUser } = require('../middlewares/authentication');
const userRouter = require("express").Router();

userRouter.get('/details/:userId', verifyToken, verifyUser, getUser);
userRouter.put('/update/:userId', verifyToken, verifyUser, updateUser);
userRouter.put('/updatepassword/:userId', verifyToken, verifyUser, updatePassword);

module.exports = userRouter;
