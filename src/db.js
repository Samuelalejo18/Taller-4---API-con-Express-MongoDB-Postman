//Importar la libreria de mongoose
const mongoose = require("mongoose");

require("dotenv").config();
const { URI_MONGO } = process.env;

// Función para conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URI_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    process.exit(1); // Finaliza el proceso si no se puede conectar
  }
};

// Exportar la función de conexión
module.exports = connectDB;
