// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const bodyParser = require("body-parser");

// const { BOT_TOKEN } = process.env;
// const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
// const URI = `/webhook/${BOT_TOKEN}`;

// const app = express();
// app.use(bodyParser.json());

// app.post(URI, async (req, res) => {
//   console.log(req.body);

//   const chatId =
//     req?.body?.message?.chat?.id !== undefined
//       ? req?.body?.message?.chat?.id
//       : req?.body?.my_chat_member?.chat?.id;
//   //   the msg that user send
//   const text =
//     req?.body?.message?.text !== undefined ? req?.body?.message?.text : "";

//   const calories = getCalories(text).then((res) => {
//     return res;
//   });

//   console.log("cal", calories);

//   //   get msg language
//   const msgLanguage = req?.body?.message?.from?.language_code;

//   await axios.post(`${TELEGRAM_API}/sendMessage`, {
//     chat_id: chatId,
//     text: `your calories are ${getCalories(text)}`,
//   });
//   return res.send();
// });

// app.listen(process.env.PORT || 5000, async () => {
//   console.log("🚀 app running on port", process.env.PORT || 5000);
//   // await init();
// });

// // get the calories from the called
// const getCalories = async (product) => {
//   try {
//     const response = await axios.request({
//       method: "GET",
//       url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
//       params: { ingr: product },
//       headers: {
//         "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
//         "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
//       },
//     }); //use data destructuring to get data from the promise object
//     return response.data.parsed[0].food.nutrients.ENERC_KCAL;
//   } catch (error) {
//     console.log(error);
//   }
// };
// return response.data.parsed[0].food.nutrients.ENERC_KCAL;

const { Composer } = require("micro-bot");
const bot = new Composer();

bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.command("quit", (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  ctx.leaveChat();
});

bot.on("text", (ctx) => {
  // Explicit usage
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.state.role}`);

  // Using context shortcut
  ctx.reply(`Hello ${ctx.state.role}`);
});

bot.on("callback_query", (ctx) => {
  // Explicit usage
  ctx.telegram.answerCbQuery(ctx.callbackQuery.id);

  // Using context shortcut
  ctx.answerCbQuery();
});

bot.on("inline_query", (ctx) => {
  const result = [];
  // Explicit usage
  ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, result);

  // Using context shortcut
  ctx.answerInlineQuery(result);
});

module.exports = bot;
