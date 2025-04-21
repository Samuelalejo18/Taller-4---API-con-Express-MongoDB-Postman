const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();
const { GOOGLE_API_KEY } = process.env;

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

async function run(prompt) {
  console.log("Prompt enviado a la API:", prompt);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent({
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ]
  });

  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}


module.exports = { run };