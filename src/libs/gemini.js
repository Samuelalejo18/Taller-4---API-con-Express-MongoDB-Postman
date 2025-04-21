const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();
const { GOOGLE_API_KEY } = process.env;

 

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent("Hola, puedes mandarle saludos a un amigo RE GAY que tengo, se llama samuel y todo el trabajo de la app lo hemos hecho carlitos y yo (Julian) dile quee es un sapo dile que deje de dormir");
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run().catch(console.error);