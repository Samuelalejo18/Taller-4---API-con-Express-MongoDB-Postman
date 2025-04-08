const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error && Array.isArray(error.errors)) {
            return res.status(400).json({
                errors: error.errors.map((e) => e.message),
            });
        } else {
            console.error("Error en el validador:", error);
            return res.status(500).json({
                error: "Error interno en la validación de datos",
            });
        }
    }
};

module.exports = { validateSchema };