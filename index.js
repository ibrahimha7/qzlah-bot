// return response.data.parsed[0].food.nutrients.ENERC_KCAL;

const { Composer } = require("micro-bot");
const axios = require("axios");
const bot = new Composer();
const bot_api = process.env.BOT_API_SERVER;

bot.start((ctx) => ctx.reply("ارحب"));

bot.on("text", (ctx) => {
  let message = ctx.message.text;
  const response = axios.get(`${bot_api}/cal/${message}`);
  console.log(response);

  ctx.reply(`سعراتك  ${response?.cal}`);
});

module.exports = bot;
