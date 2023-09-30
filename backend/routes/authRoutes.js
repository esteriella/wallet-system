const { signup, signin } = require("../controllers/AuthController");
const userVerification = require("../middlewares/authentication");
const authRouter = require("express").Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = authRouter;