const { getUser, updateUser, updatePassword } = require('../controllers/UserController');
const userVerification = require("../middleware/authentication");
const router = require("express").Router();

router.get('/user/details/:userId', userVerification, getUser);
router.put('/user/updateuser/:userId', userVerification, updateUser);
router.put('/user/updatepassword/:userId', userVerification, updatePassword);

module.exports = router;
