const express = require("express");
const app = express();



// Habilita el manejo de datos en formato URL codificado en las solicitudes (form-data)
app.use(express.urlencoded({ extended: true }));



// Habilita la interpretación de solicitudes con datos en formato JSON
app.use(express.json());





require("./db.js");
module.exports = app;
