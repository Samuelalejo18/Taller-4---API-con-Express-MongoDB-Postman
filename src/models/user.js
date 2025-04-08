const e = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },

  //altura
  height: {
    type: Number,
    required: true,
  },

  //Peso
  weight: {
    type: Number,
    required: true,
  },
  //experiencia de entrenamiento
  experienceTraining: {
    type: String,
    required: true,
  },
  //Cuantos días quiere entrenar
  desiredTrainingDays: {
    type: Number,
    required: true,
  },
  //Indicaciones de salud
  healthIndications: {
    type: String,
    required: true,
  },
  //metabolismo
  metabolism: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
