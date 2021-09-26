// return response.data.parsed[0].food.nutrients.ENERC_KCAL;

const { Composer } = require("micro-bot");
const axios = require("axios");
const bot = new Composer();
const bot_api = process.env.BOT_API_SERVER;

let foodCalories;
const getFood = async (food) => {
  await getFoodFromApi(food).then((res) => {
    foodCalories = res.cal;
    return res.cal;
  });
};
const getFoodFromApi = async (food) => {
  return await axios.get(`${bot_api}cal/${food}`).then((response) => {
    response = response.data;
    return response;
  });
};

bot.start((ctx) => ctx.reply("ارحب"));

bot.on("text", (ctx) => {
  let message = ctx.message.text;
  getFood(message);
  ctx.reply(`سعراتك: ${foodCalories} يازلمه`);
  ctx.reply(`باقي شين؟`);
});

module.exports = bot;
