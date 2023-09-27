const { Signup, Signin } = require("../controllers/AuthController");
const userVerification = require("../middleware/authentication");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.post('/',userVerification);

module.exports = router;