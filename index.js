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
      url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
      params: { query: food },
      headers: {
        "x-rapidapi-host": "nutrition-by-api-ninjas.p.rapidapi.com",
        "x-rapidapi-key": "BAa4aA12AFmshMDWPhRIPhLjqhvlp1CMKA6jsnqibLJovBwXIW",
      },
    })
    .then(function(response) {
      let x = {
        food: response.data.name,
        cal: response.data.calories,
        sizeInG: response.data.serving_size_g,
      };
      return x;
    });
};

bot.start((ctx) => ctx.reply("ارحب"));

bot.use((ctx) => {
  let message = ctx.message.text;
  getFoodFromApi(message).then((res) => {
    ctx.reply(`انت اجلت: ${res.food}
    وفيهو: ${res.cal}
    حجمو بالجرام: ${res.sizeInG}
    `);
  });
});

// bot.launch();
module.exports = bot;
