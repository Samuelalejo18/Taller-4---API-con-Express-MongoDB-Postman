const validatePrompt = (req, res, next) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res
      .status(400)
      .json({ message: "El campo 'prompt' es obligatorio." });
  }

  if (typeof prompt !== "string") {
    return res
      .status(400)
      .json({ message: "El campo 'prompt' debe ser un string." });
  }

  if (prompt.trim().length === 0) {
    return res
      .status(400)
      .json({ message: "El campo 'prompt' no puede estar vacío." });
  }

  // Validar caracteres no permitidos
  const invalidChars = /[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ¿?¡!., ]/g;
  if (invalidChars.test(prompt)) {
    return res
      .status(400)
      .json({
        message: "El campo 'prompt' contiene caracteres no permitidos.",
      });
  }

  next();
};

module.exports = { validatePrompt };
