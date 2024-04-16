const router = require("express").Router();
const {
  login,
  register,
  forgetPassword,
  resetCodeCheck,
  resetPassword,
} = require("./controller");
const authValidation = require("../../middlewares/validations/auth.validation");

router.post("/login", authValidation.login, login);

router.post("/register", authValidation.register, register);

router.post("/forget-password", forgetPassword);

router.post("/reset-code-check", resetCodeCheck);

router.post("/reset-password", resetPassword);

module.exports = router;
