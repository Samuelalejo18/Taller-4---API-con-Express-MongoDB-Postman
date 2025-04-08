
const User = require("../../models/user.js");
const bcrypt = require("bcrypt");

//Importar token

const { createAccessToken } = require("../../libs/jwt.js");
//Importar la libreria de jsonwebtoken

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const {
    name,
    lastName,
    age,
    email,
    password,
    phone,
    height,
    weight,
    experienceTraining,
    desiredTrainingDays,
    healthIndications,
    metabolism,
  } = req.body;

  try {
    const userFoundEmail = await User.findOne({ email });
    if (userFoundEmail) {
      return res
        .status(400)
        .json({ message: " El correo ya esta registrado ❌" });
    }

    const userFoundPhone = await User.findOne({ phone });
    if (userFoundPhone) {
      return res
        .status(400)
        .json({ message: " El telefono ya esta registrado ❌" });
    }

    //Incriptar la contraseña

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      age,
      email,
      password: passwordHash,
      phone,
      height,
      weight,
      experienceTraining,
      desiredTrainingDays,
      healthIndications,
      metabolism,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      name: userSaved.name,
      lastName: userSaved.lastName,
      age: userSaved.age,
      email: userSaved.email,
      height: userSaved.height,
      weight: userSaved.weight,
      experienceTraining: userSaved.experienceTraining,
      desiredTrainingDays: userSaved.desiredTrainingDays,
      healthIndications: userSaved.healthIndications,
      metabolism: userSaved.metabolism,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = register;
