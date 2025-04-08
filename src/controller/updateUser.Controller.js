/// Metodos http, para el manejo de usuarios
// el metodo post sea realizo en auth controller

const User = require("../models/user.js");
const bcrypt = require("bcrypt");
//get para obtener los datos del us
// PUT: Actualizar un usuario por ID

const updateUser = async (req, res) => {
  try {
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

    // Verificar si el correo ya está registrado por otro usuario
    const userFoundEmail = await User.findOne({
      email,
      _id: { $ne: req.params.id },
    });
    if (userFoundEmail) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Verificar si el teléfono ya está registrado por otro usuario
    const userFoundPhone = await User.findOne({
      phone,
      _id: { $ne: req.params.id },
    });
    if (userFoundPhone) {
      return res
        .status(400)
        .json({ message: "El teléfono ya está registrado" });
    }

    // Encriptar la contraseña solo si se envió una nueva
    let updatedPassword = undefined;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Construir objeto con los campos actualizables
    const updateData = {
      name,
      lastName,
      age,
      email,
      phone,
      height,
      weight,
      experienceTraining,
      desiredTrainingDays,
      healthIndications,
      metabolism,
    };

    if (updatedPassword) {
      updateData.password = updatedPassword;
    }

    // Actualizar usuario
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({
      message: "Usuario actualizado con éxito",
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error actualizando el usuario", error: error.message });
  }
};

module.exports = { updateUser };
