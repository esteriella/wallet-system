const { signup, signin } = require("../controllers/AuthController");
const authRouter = require("express").Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

module.exports = authRouter;