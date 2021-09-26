// return response.data.parsed[0].food.nutrients.ENERC_KCAL;

const { Composer } = require("micro-bot");
const axios = require("axios");

// const { Telegraf } = require("telegraf");
// const bot = new Telegraf(process.env.BOT_TOKEN);
const bot = new Composer();
const getFoodFromApi = async (food) => {
  return await axios
    .request({
      method: "GET",
      url: "https://edamam-food-and-grocery-database.p.rapidapi.com/parser",
      params: { ingr: food },
      headers: {
        "x-rapidapi-host": "edamam-food-and-grocery-database.p.rapidapi.com",
        "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
      },
    })
    .then(function(response) {
      let x = {
        food: food,
        cal: response.data.parsed[0]?.food?.nutrients?.ENERC_KCAL,
      };
      return x;
    });
};

bot.start((ctx) => ctx.reply("ارحب"));

bot.use((ctx) => {
  let message = ctx.message.text;
  getFoodFromApi(message).then((res) => {
    ctx.reply(`your calories are: ${res.cal}`);
  });
});

// bot.launch();
module.exports = bot;
