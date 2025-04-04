//Habilitar las varias de entorno
require("dotenv").config();

//Desestructuramos el puerto de las variables de entorno
const { PORT } = process.env;

const app = require("./src/app.js");
const connectDB = require("./src/db.js");
connectDB();

// Inicia el servidor en el puerto especificado en las variables de entorno
// y muestra un mensaje en la consola si el servidor se levanta correctamente

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
