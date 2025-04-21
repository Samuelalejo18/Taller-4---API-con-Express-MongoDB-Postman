const { run } = require("../../libs/gemini.js");

const chatBot = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await run(prompt);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = chatBot;
