const { Router } = require("express");

const routerCrudUser = Router();
const { validateSchema } = require("../middlewares/validator.middleware.js");
const { registerSchema } = require("../schemas/userSchemaZod.js");

const {
  getUsers,
  getUserByID,
} = require("../controller/CRUD/getUsers.Controller.js");

const { updateUser } = require("../controller/CRUD/updateUser.Controller.js");

const { deleteUser } = require("../controller/CRUD/deleteUser.controller.js");

routerCrudUser.get("/getUsers", getUsers);

routerCrudUser.get("/getUserByID/:id", getUserByID);

routerCrudUser.put(
  "/updateUser/:id",
  validateSchema(registerSchema),
  updateUser
);

routerCrudUser.delete("/deleteUser/:id", deleteUser);

module.exports = routerCrudUser;
