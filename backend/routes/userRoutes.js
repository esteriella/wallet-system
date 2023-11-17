const { getUser, updateUser, verifyBVN, updatePassword } = require('../controllers/UserController');
const { verifyLogin, verifyUser } = require('../middlewares/authentication');
const userRouter = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

userRouter.get('/details/:userId', verifyLogin, verifyUser, getUser);
userRouter.put('/update/:userId', verifyLogin, verifyUser, updateUser);
userRouter.put('/verify-bvn/:userId', verifyLogin, verifyUser, upload.single("image"), verifyBVN);
userRouter.put('/updatepassword/:userId', verifyLogin, verifyUser, updatePassword);

module.exports = userRouter;
