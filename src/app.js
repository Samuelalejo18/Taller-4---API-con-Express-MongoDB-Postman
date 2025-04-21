const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");

const cors = require("cors");

const authRoutes = require("./routes/auth.routes.js");
const routerCrudUser = require("./routes/user.routes.js");
const routerCharBot = require("./routes/chatbot.routes.js");
app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

// Habilita la interpretación de solicitudes con datos en formato JSON
app.use(express.json());
// Habilita el manejo de datos en formato URL codificado en las solicitudes (form-data)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", routerCrudUser);
app.use("/api", routerCharBot);

require("./db.js");
module.exports = app;
