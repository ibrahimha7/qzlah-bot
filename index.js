const axios = require("axios");

const { Composer } = require("micro-bot");
// const { Telegraf } = require("telegraf");
// const bot = new Telegraf("2044843585:AAH794jP4ozQIy3hd5eRU1-uaChiEUD5ALA");
const bot = new Composer();

const reducer = (previousValue, currentValue) => previousValue + currentValue;

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
      let x;
      if (response.data.length < 1) {
        x = {
          food: response.data[0].name,
          cal: response.data[0].calories,
          sizeInG: response.data[0].serving_size_g,
        };
      } else {
        let countName = [];
        let countCalories = [];
        let countGrams = [];
        response.data.map((item) => {
          countName.push(item.name);
          countCalories.push(item.calories);
          countGrams.push(item.serving_size_g);
        });
        x = {
          food: countName.join(),
          cal: countCalories.reduce(reducer),
          sizeInG: countGrams.reduce(reducer),
        };
      }

      return x;
    });
};

bot.start((ctx) => ctx.reply("ارحب"));

bot.use((ctx) => {
  let message = ctx.message.text;
  getFoodFromApi(message).then((res) => {
    ctx.reply(`انت اجلت: ${res.food}
    وفيهو: ${res.cal} سعره
    حجمو بالجرام: ${res.sizeInG}
    `);
  });
});

// bot.launch();
module.exports = bot;
