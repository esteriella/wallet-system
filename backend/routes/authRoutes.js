const { Signup } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/signup", Signup);

module.exports = router;