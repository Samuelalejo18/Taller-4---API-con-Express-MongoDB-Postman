//este archivo valida la informacion que ingresa el cliente

//zod es una depedencia donde 'z', permite dar tipos de datos(tipar)

const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  lastName: z.string().min(1, "El apellido es obligatorio"),
  age: z
    .number({ invalid_type_error: "La edad debe ser un número" })
    .int()
    .positive("La edad debe ser un número positivo")
    .min("13", "La edad debe ser mayor a 13 años")
    .max("100", "La edad debe ser menor a 100 años"),
  email: z.string().email("Correo electrónico no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
    .max(14, "La contraseña no puede ser mayor a 14 caracteres"),

  phone: z
    .string()
    .min(7, "Número de teléfono inválido")
    .max(15, "Número de teléfono demasiado largo"),

  height: z
    .number({ invalid_type_error: "La altura debe ser un número" })
    .positive("La altura debe ser un número positivo"),

  weight: z
    .number({ invalid_type_error: "El peso debe ser un número" })
    .positive("El peso debe ser un número positivo"),

  experienceTraining: z
    .string()
    .min(1, "La experiencia de entrenamiento es obligatoria"),

  desiredTrainingDays: z
    .number({ invalid_type_error: "Debe indicar un número de días" })
    .int()
    .min(1, "Debe entrenar al menos un día")
    .max(7, "No puede entrenar más de 7 días"),

  healthIndications: z
    .string()
    .min(1, "Debe indicar su estado de salud o escribir 'Ninguna'"),

  metabolism: z.string().min(1, "Debe especificar su tipo de metabolismo"),
});

const loginSchema = z.object({
  email: z.string().email("Correo electrónico no válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial")
    .max(14, "La contraseña no puede ser mayor a 14 caracteres"),
});

module.exports = { registerSchema, loginSchema };
