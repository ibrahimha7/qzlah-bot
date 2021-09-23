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

interface IMessage {
  message_id: number;
  from: {
    id: number,
    is_bot: boolean,
    first_name: string,
    last_name: string,
    language_code: "ar" | "en",
  };
  chat: {
    id: number,
    first_name: string,
    last_name: string,
    type: string,
  };
  date: number;
  text: string; // The actual message
}
bot.start((ctx) => ctx.reply("ارحب"));

bot.on("text", (ctx) => {
  let message = ctx.message.text;
  getCalories(message);

  ctx.reply(`سعراتك  ${getCalories(message)}`);
});

// get calories
const getCalories = async (product) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
      params: { ingr: product },
      headers: {
        "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
      },
    }); //use data destructuring to get data from the promise object
    return response.data.parsed[0].food.nutrients.ENERC_KCAL;
  } catch (error) {
    console.log(error);
  }
};
module.exports = bot;
