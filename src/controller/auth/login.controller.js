const User = require("../../models/user.js");
const bcrypt = require("bcrypt");

//Importar token

const { createAccessToken } = require("../../libs/jwt.js");
//Importar la libreria de jsonwebtoken

const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password} = req.body;

    //buscar si el correo existe

    const userFoundEmail = await User.findOne({ email });
    if (!userFoundEmail) {
      return res.status(400).json({ message: "El correo no existe ❌" });
    }

    //Comparar la contraseña

    const matchedPassword = await bcrypt.compare(
      password,
      userFoundEmail.password
    );

    if (!matchedPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta ❌" });
    }

    //Crear token y dovolver un token
    const token = await createAccessToken({ id: userFoundEmail._id });
    res.cookie("token", token);

    res.json({
      id: userFoundEmail._id,
      name: userFoundEmail.name,
      lastName: userFoundEmail.lastName,
      age: userFoundEmail.age,
      email: userFoundEmail.email,
      height: userFoundEmail.height,
      weight: userFoundEmail.weight,
      experienceTraining: userFoundEmail.experienceTraining,
      desiredTrainingDays: userFoundEmail.desiredTrainingDays,
      healthIndications: userFoundEmail.healthIndications,
      metabolism: userFoundEmail.metabolism,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Deslogearse o cerrar el token

const logout = (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
};

//mirar perfil

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  res.json({
    id: userFound._id,
    name: userFound.name,
    lastName: userFound.lastName,
    age: userFound.age,
    email: userFound.email,
    height: userFound.height,
    weight: userFound.weight,
    experienceTraining: userFound.experienceTraining,
    desiredTrainingDays: userFound.desiredTrainingDays,
    healthIndications: userFound.healthIndications,
    metabolism: userFound.metabolism,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(400).json({ message: "No autirizado" });
  jwt.verify(token, SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autirizado" });
    const userFound = await User.findById(user.id);

    if (!userFound) return res.status(401).json({ message: "No autirizado" });

    res.json({
      id: userFound._id,
      name: userFound.name,
      lastName: userFound.lastName,
      age: userFound.age,
      email: userFound.email,
      height: userFound.height,
      weight: userFound.weight,
      experienceTraining: userFound.experienceTraining,
      desiredTrainingDays: userFound.desiredTrainingDays,
      healthIndications: userFound.healthIndications,
      metabolism: userFound.metabolism,
    });
  });
};

module.exports = { login, logout, profile, verifyToken };
