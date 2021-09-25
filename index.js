// return response.data.parsed[0].food.nutrients.ENERC_KCAL;

const { Composer } = require("micro-bot");
const axios = require("axios");
const bot = new Composer();
const bot_api = process.env.BOT_API_SERVER;

bot.start((ctx) => ctx.reply("ارحب"));

bot.on("text", (ctx) => {
  let message = ctx.message.text;

  getFood(message).then((res) => {
    ctx.reply(`سعراتك  ${res?.cal}`);
  });
  ctx.reply(`باقي شين؟`);
});

const getFood = (food) => {
  return axios.get(`${bot_api}cal/${food}`).then((response) => {
    response = response.data;
    return response;
  });
};

module.exports = bot;
