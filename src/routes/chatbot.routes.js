const { Router } = require("express");

const routerCharBot = Router();
const { validatePrompt} = require("../middlewares/validatePrompt.js");
const chatBot = require("../controller/IA/chatbot.controller.js");

routerCharBot.post("/chatbot", chatBot);

module.exports = routerCharBot;
