const { Router } = require("express");

const router = Router();

const authRequired = require("../middlewares/validateToken.js");
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { registerSchema, loginSchema } = require("../schemas/userSchemaZod.js");
const register = require("../controller/auth/register.controller.js");
const {
  login,
  logout,
  profile,
  verifyToken,
} = require("../controller/auth/login.controller.js");

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

module.exports = router;
